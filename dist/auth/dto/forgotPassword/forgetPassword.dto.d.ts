export declare enum ResetMethod {
    EMAIL = "email",
    SMS = "sms",
    BOTH = "both"
}
export declare class ForgotPasswordDto {
    email: string;
    resetMethod?: ResetMethod;
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
}
export declare class VerifyResetTokenDto {
    email: string;
    token: string;
    ipAddress?: string;
}
export declare class ResetPasswordDto {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
}
export declare class ResendResetTokenDto {
    email: string;
    resetMethod?: ResetMethod;
    ipAddress?: string;
}
