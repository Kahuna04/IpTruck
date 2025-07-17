import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login/login.dto';
import { EmailService } from '../email/email.service';
import { JwtPayload, Tokens } from '../shared/constants';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgotPassword/forgetPassword.dto';
import { ForgotPasswordRO } from './dto/forgotPassword/adapter.dto';
import { JwtHandler } from './jwt.service';
import { UserRO } from './dto/login/adapter.dto';
import { HelperService } from '../shared/helper.service';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserType } from '../shared/constants';
import { ShipperService } from '../shipper/shipper.service';
import { CarrierService } from '../carrier/carrier.service';
import { CreateShipperDto } from '../shipper/dto/create-shipper.dto';
import { CreateCarrierDto } from '../carrier/dto/create-carrier.dto';
import { CreateCompanyDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtHandler,
    private readonly emailService: EmailService,
    private readonly helperService: HelperService,
    private readonly shipperService: ShipperService,
    private readonly carrierService: CarrierService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  /* 
=======================================
User Registration Method
========================================
*/
  async createUser(userDetails: CreateCompanyDto): Promise<UserRO> {
    let savedUser: any;
    const { email, password, userType, address, ...companyDetails } =
      userDetails;

    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'An account with this email address already exists. Please use a different email or try logging in.',
        );
      }

      // Check if business email already exists in shipper or carrier tables
      const existingBusinessEmail = await Promise.all([
        this.prisma.shipper.findUnique({
          where: { businessEmail: companyDetails.businessEmail },
        }),
        this.prisma.carrier.findUnique({
          where: { businessEmail: companyDetails.businessEmail },
        }),
      ]);

      if (existingBusinessEmail[0] || existingBusinessEmail[1]) {
        throw new BadRequestException(
          'A company with this business email address already exists. Please use a different business email.',
        );
      }

      // Create user in the database
      savedUser = await this.prisma.user.create({
        data: {
          email,
          password: await this.helperService.hashData(password),
          userType: userType as any, // Map from CompanyType to UserType
        },
      });

      // Conditionally create shipper or carrier based on the userType
      if (userType === 'SHIPPER') {
        const shipperData: CreateShipperDto = {
          userId: savedUser.id,
          companyName: companyDetails.companyName,
          registrationNumber: companyDetails.registrationNumber,
          taxId: companyDetails.taxId,
          businessEmail: companyDetails.businessEmail,
          phoneNumber: companyDetails.phoneNumber,
          website: companyDetails.website,
          companySize: companyDetails.companySize,
          description: companyDetails.description,
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          countryCode: address.countryCode,
          contactFirstName: companyDetails.contactFirstName,
          contactLastName: companyDetails.contactLastName,
          contactJobTitle: companyDetails.contactJobTitle,
          contactPhone: companyDetails.contactPhone,
          contactEmail: companyDetails.contactEmail,
          expectedMonthlyVolume: companyDetails.expectedMonthlyVolume,
          operatingRegions: companyDetails.operatingRegions,
          marketingOptIn: companyDetails.marketingOptIn,
        };
        await this.shipperService.create(shipperData);
      } else if (userType === 'CARRIER') {
        const carrierData: CreateCarrierDto = {
          userId: savedUser.id,
          companyName: companyDetails.companyName,
          registrationNumber: companyDetails.registrationNumber,
          taxId: companyDetails.taxId,
          businessEmail: companyDetails.businessEmail,
          phoneNumber: companyDetails.phoneNumber,
          website: companyDetails.website,
          companySize: companyDetails.companySize,
          description: companyDetails.description,
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          countryCode: address.countryCode,
          contactFirstName: companyDetails.contactFirstName,
          contactLastName: companyDetails.contactLastName,
          contactJobTitle: companyDetails.contactJobTitle,
          contactPhone: companyDetails.contactPhone,
          contactEmail: companyDetails.contactEmail,
          fleetSize: companyDetails.fleetSize,
          operatingRegions: companyDetails.operatingRegions,
          marketingOptIn: companyDetails.marketingOptIn,
        };
        await this.carrierService.create(carrierData);
      }
    } catch (error: any) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      
      // If it's already a BadRequestException, re-throw it
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      // Handle specific Prisma errors
      if (error.code === 'P2002') {
        // Unique constraint violation
        const target = error.meta?.target;
        if (target?.includes('email')) {
          throw new BadRequestException(
            'An account with this email address already exists. Please use a different email or try logging in.',
          );
        }
        if (target?.includes('businessEmail')) {
          throw new BadRequestException(
            'A company with this business email address already exists. Please use a different business email.',
          );
        }
        throw new BadRequestException(
          'A record with these details already exists. Please check your information and try again.',
        );
      }
      
      // Generic database error
      throw new BadRequestException('Database error occurred');
    }

    // Generate JWT token payload
    const payload: JwtPayload = {
      sub: savedUser.id,
      email: savedUser.email,
      userType: savedUser.userType,
    };
    // Generate Tokens
    const { accessToken, refreshToken } =
      await this.jwtService.generateTokens(payload);
    await this.updateRefreshToken(savedUser.id, refreshToken);

    // Send Welcome Email -- Adjust logic when email templates and services are implemented
    try {
      // Prepare email data with both personal and business email
      const emailData = {
        ...userDetails,
        contactEmail: email, // Add personal email as contact email
      };
      
      if (userType === 'SHIPPER') {
        await this.emailService.sendCompanyWelcomeEmail(
          emailData as any,
          accessToken,
        );
      } else {
        await this.emailService.sendCompanyWelcomeEmail(
          emailData as any,
          accessToken,
        );
      }
    } catch (emailError) {
      // Log email error but don't fail the signup process
      this.logger.error(
        `Failed to send welcome email to ${email}: ${emailError.message}`,
        emailError.stack,
      );
      // Continue with successful signup response
    }

    return new UserRO({
      status: 201,
      message: 'User registration successful',
      data: {
        accessToken,
        refreshToken,
      },
    });
  }

  /* 
=======================================
User Login Method
========================================
*/
  async login(loginDetails: LoginDto): Promise<UserRO> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDetails.email },
    });

    if (
      !user ||
      !(await this.helperService.compareHash(
        loginDetails.password,
        user.password,
      ))
    ) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
    };

    // Generate Tokens
    const { accessToken, refreshToken } =
      await this.jwtService.generateTokens(payload);
    await this.updateRefreshToken(user.id, refreshToken);

    return new UserRO({
      status: 200,
      message: 'Login successful',
      data: {
        accessToken,
        refreshToken,
      },
    });
  }

  /* 
=======================================
User LogOut Method
========================================
*/

  async logout(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });
  }

  /* 
=======================================
Password Recovery Method
========================================
*/

  forgotPassword = async (
    details: ForgotPasswordDto,
  ): Promise<ForgotPasswordRO> => {
    const { email } = details;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new BadRequestException(
        'Reset instruction will be sent to only valid email!',
      );
    // Generate Reset Password Token
    const resetToken = await this.jwtService.generateResetToken(email);
    // Hash token and send to resetPassword token field
    const hashedToken = await this.helperService.hashData(resetToken);

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { resetPasswordToken: hashedToken },
      });
    } catch (error) {
      throw new BadRequestException('Database error occurred');
    }

    // Get user profile for name
    const userProfile = await this.getUserProfile(user.id);

    this.emailService.sendPasswordRecoveryEmail({
      email,
      name: userProfile?.contactFirstName || 'User',
      resetToken,
    });
    return new ForgotPasswordRO({
      status: 200,
      message: 'Successful',
      data: 'Password recovery link has been sent your your email, Kindly check your mail',
    });
  };

  /* 
=======================================
Password Reset Method
========================================
*/
  async resetPassword(resetData: ResetPasswordDto) {
    const { resetToken, newPassword, confirmPassword } = resetData;

    // Compare passwords
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Password must be the same');
    }

    //Verify Token
    const payload = await this.jwtService.verifyToken(resetToken);
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (
      !user ||
      !user.resetPasswordToken ||
      !(await this.helperService.compareHash(
        resetToken,
        user.resetPasswordToken,
      ))
    ) {
      throw new BadRequestException('Invalid Reset Password Token!!!');
    }

    try {
      const hashedPassword = await this.helperService.hashData(newPassword);
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetPasswordToken: null,
        },
      });
    } catch (error) {
      this.logger.error(
        `Error resetting password: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
    return new ForgotPasswordRO({
      status: 200,
      message: 'Successful',
      data: 'Your Password has been reset successfully, Kindly login with your new password',
    });
  }

  /* 
=======================================
Refresh Token Method
========================================
*/
  async refreshToken(
    refreshToken: string,
    payload: JwtPayload,
  ): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (
      user &&
      user.refreshToken &&
      (await this.helperService.compareHash(refreshToken, user.refreshToken))
    ) {
      const { accessToken, refreshToken: newRefreshToken } =
        await this.jwtService.generateTokens(payload);
      await this.updateRefreshToken(payload.sub, newRefreshToken);
      return { accessToken, refreshToken: newRefreshToken };
    }
    throw new ForbiddenException('Access Denied!!!');
  }

  /* 
=======================================
Update Refresh Token
========================================
*/
  async updateRefreshToken(id: string, refreshToken: string) {
    // Hash refreshToken and store in the database
    const hashedRt = await this.helperService.hashData(refreshToken);
    try {
      await this.prisma.user.update({
        where: { id },
        data: { refreshToken: hashedRt },
      });
    } catch (error) {
      throw new BadRequestException('Database error occurred');
    }
  }

  /* 
=======================================
Update User Location
========================================
*/
  async updateLocation(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        lat: updateLocationDto.lat,
        lng: updateLocationDto.lng,
      },
    });
  }

  /* 
=======================================
Helper method to get user profile
========================================
*/
  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        shipper: true,
        carrier: true,
      },
    });

    if (!user) return null;

    return user.userType === 'SHIPPER' ? user.shipper : user.carrier;
  }

  /* 
=======================================
Test email method
========================================
*/
  async testEmail(email: string): Promise<void> {
    try {
      await this.emailService.sendTestEmail(email);
      this.logger.log(`Test email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send test email to ${email}: ${error.message}`, error.stack);
      throw error;
    }
  }
}
