import { CreateCompanyDto } from './dto/signup.dto';
import { LoginDto } from './dto/login/login.dto';
import { Request } from 'express';
import { ForgotPasswordDto } from './dto/forgotPassword/forgetPassword.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordRO } from './dto/forgotPassword/adapter.dto';
import { AuthService } from './auth.service';
import { UpdateLocationDto } from './dto/updateLocation.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(signupDetails: CreateCompanyDto): Promise<import("./dto/login/adapter.dto").UserRO>;
    login(loginDetails: LoginDto): Promise<import("./dto/login/adapter.dto").UserRO>;
    logout(req: Request): Promise<string>;
    updateLocation(id: string, updateLocationDto: UpdateLocationDto): Promise<any>;
    forgotPassword(forgotPasswordData: ForgotPasswordDto): Promise<ForgotPasswordRO>;
    resetPassword(resetData: ResetPasswordDto): Promise<ForgotPasswordRO>;
    refreshToken(req: Request): Promise<import("../shared/constants").Tokens>;
    testEmail(body: {
        email: string;
    }): Promise<{
        message: string;
        error?: undefined;
        details?: undefined;
    } | {
        error: string;
        details: any;
        message?: undefined;
    }>;
}
