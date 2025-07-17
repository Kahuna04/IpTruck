import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/signup.dto';
import { LoginDto } from './dto/login/login.dto';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt_at.guard';
import { ForgotPasswordDto } from './dto/forgotPassword/forgetPassword.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordRO } from './dto/forgotPassword/adapter.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/jwt_rt.guard';
import { UpdateLocationDto } from './dto/updateLocation.dto';

@ApiTags('UserAuth')
@Controller('auth')
//Removing sensitive through serialization
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** API Endpoint for User Registration */
  @ApiBadRequestResponse()
  @Post('signup')
  createUser(@Body() signupDetails: CreateCompanyDto) {
    return this.authService.createUser(signupDetails);
  }

  /**
   * This endpoint logs the user in
   * a 401 error is thrown if endpoint doesn't exist
   * @param loginDetails
   */
  @ApiUnauthorizedResponse({
    description:
      'Invalid Email or Password, Please check your login credentials',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDetails: LoginDto) {
    return this.authService.login(loginDetails);
  }

  /** API Endpoint to Logout User */
  @Get('logout')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    await this.authService.logout(req.user!['sub']);
    return 'You have successfully logout of the system, see you soon!';
  }

  /**API Endpoint to Update User Location */
  @Post('location/update/:id')
  @HttpCode(HttpStatus.OK)
  async updateLocation(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.authService.updateLocation(id, updateLocationDto);
  }

  /**
   * This endpoint is  called when a user forgots his/her password
   * @param forgotPasswordData
   */
  @Post('password/forgot')
  @HttpCode(HttpStatus.OK)
  forgotPassword(
    @Body() forgotPasswordData: ForgotPasswordDto,
  ): Promise<ForgotPasswordRO> {
    return this.authService.forgotPassword(forgotPasswordData);
  }

  /**
   * This endpoint is called when a user wants to reset his/her password
   * @param resetData
   */
  @Post('password/reset')
  @HttpCode(HttpStatus.OK)
  resetPassword(
    @Body() resetData: ResetPasswordDto,
  ): Promise<ForgotPasswordRO> {
    return this.authService.resetPassword(resetData);
  }

  /** API Endpoint to get Refresh Tokens */
  @Get('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshToken(
      user!['refreshToken'],
      user!['payload'],
    );
  }

  /** API Endpoint to test email sending */
  @Post('test-email')
  @HttpCode(HttpStatus.OK)
  async testEmail(@Body() body: { email: string }) {
    try {
      await this.authService.testEmail(body.email);
      return { message: 'Test email sent successfully' };
    } catch (error) {
      return { error: 'Failed to send test email', details: error.message };
    }
  }
}
