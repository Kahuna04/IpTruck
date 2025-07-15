export declare class ForgotPasswordRO {
    status: number;
    message: string;
    data: string;
    constructor(init?: Partial<ForgotPasswordRO>);
}
export declare class PasswordResetRequestAdapter {
    email: string;
    resetMethod: string;
    ipAddress: string;
    userAgent: string;
    deviceId: string;
    requestedAt: Date;
    expiresAt: Date;
    token: string;
    status: string;
    constructor(partial: Partial<PasswordResetRequestAdapter>);
}
export declare class EmailNotificationAdapter {
    recipientEmail: string;
    companyName: string;
    contactFirstName: string;
    contactLastName: string;
    resetToken: string;
    resetUrl: string;
    expiryTime: string;
    templateType: string;
    priority: string;
    constructor(partial: Partial<EmailNotificationAdapter>);
}
export declare class SMSNotificationAdapter {
    recipientPhone: string;
    companyName: string;
    contactFirstName: string;
    resetToken: string;
    message: string;
    senderId: string;
    messageType: string;
    constructor(partial: Partial<SMSNotificationAdapter>);
}
export declare class SecurityAuditAdapter {
    userId: string;
    email: string;
    ipAddress: string;
    userAgent: string;
    deviceId: string;
    action: string;
    success: boolean;
    failureReason?: string;
    timestamp: Date;
    platform: string;
    additionalData?: Record<string, any>;
    constructor(partial: Partial<SecurityAuditAdapter>);
}
export declare class PasswordResetCompleteAdapter {
    userId: string;
    email: string;
    passwordChangedAt: Date;
    lastLoginAt: Date;
    accountStatus: string;
    forceRelogin: boolean;
    ipAddress: string;
    userAgent: string;
    deviceId: string;
    newPassword: string;
    oldPasswordHash: string;
    resetToken: string;
    constructor(partial: Partial<PasswordResetCompleteAdapter>);
}
export declare class TokenValidationAdapter {
    email: string;
    token: string;
    validatedAt: Date;
    isValid: boolean;
    expiresAt: Date;
    secondsUntilExpiry: number;
    ipAddress: string;
    userAgent: string;
    attemptCount: number;
    constructor(partial: Partial<TokenValidationAdapter>);
}
