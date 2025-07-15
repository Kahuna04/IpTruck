export declare enum LoginType {
    EMAIL = "email",
    PHONE = "phone"
}
export declare class LoginDto {
    email: string;
    password: string;
    rememberMe?: boolean;
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
}
export declare class TwoFactorLoginDto {
    email: string;
    verificationCode: string;
    sessionToken: string;
}
