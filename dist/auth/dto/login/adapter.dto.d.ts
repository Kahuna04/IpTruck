export declare class UserRO {
    status: number;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    };
    constructor(init?: Partial<UserRO>);
}
export declare class LoginRequestAdapter {
    email: string;
    password: string;
    rememberMe: boolean;
    ipAddress: string;
    userAgent: string;
    deviceId: string;
    loginAttemptTime: Date;
    constructor(partial: Partial<LoginRequestAdapter>);
}
export declare class ExternalAuthAdapter {
    email: string;
    externalId: string;
    provider: 'google' | 'microsoft' | 'apple';
    tokenExpiry: Date;
    providerData: Record<string, any>;
    constructor(partial: Partial<ExternalAuthAdapter>);
}
export declare class SecurityLogAdapter {
    userId: string;
    email: string;
    ipAddress: string;
    userAgent: string;
    deviceId: string;
    success: boolean;
    failureReason?: string;
    timestamp: Date;
    platform: string;
    constructor(partial: Partial<SecurityLogAdapter>);
}
