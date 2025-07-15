export declare class UserProfileResponse {
    id: string;
    email: string;
    companyName: string;
    companyType: string;
    contactFirstName: string;
    contactLastName: string;
    contactJobTitle: string;
    isVerified: boolean;
    status: string;
    lastLoginAt: string;
    createdAt: string;
    password: string;
    passwordResetToken: string;
    twoFactorSecret: string;
    constructor(partial: Partial<UserProfileResponse>);
}
export declare class LoginResponse {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    user: UserProfileResponse;
    permissions: string[];
    constructor(partial: Partial<LoginResponse>);
}
export declare class TwoFactorResponse {
    success: boolean;
    message: string;
    sessionToken: string;
    method: string;
    maskedContact: string;
    expiresIn: number;
    constructor(partial: Partial<TwoFactorResponse>);
}
export declare class LoginErrorResponse {
    success: boolean;
    message: string;
    errorCode: string;
    errorId: string;
    attemptsRemaining?: number;
    lockoutTimeRemaining?: number;
    timestamp: string;
    constructor(partial: Partial<LoginErrorResponse>);
}
export declare class LogoutResponse {
    success: boolean;
    message: string;
    timestamp: string;
    constructor(partial: Partial<LogoutResponse>);
}
