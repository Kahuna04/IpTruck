export declare class ForgetPasswordResponse {
    success: boolean;
    message: string;
    maskedEmail: string;
    maskedPhone?: string;
    deliveryMethod: string;
    expiresIn: number;
    sentAt: string;
    referenceId: string;
    constructor(partial: Partial<ForgetPasswordResponse>);
}
export declare class VerifyTokenResponse {
    success: boolean;
    message: string;
    isValid: boolean;
    maskedEmail: string;
    expiresIn: number;
    expiresAt: string;
    constructor(partial: Partial<VerifyTokenResponse>);
}
export declare class ResetPasswordResponse {
    success: boolean;
    message: string;
    maskedEmail: string;
    resetCompletedAt: string;
    requiresRelogin: boolean;
    nextSteps: string;
    constructor(partial: Partial<ResetPasswordResponse>);
}
export declare class PasswordResetErrorResponse {
    success: boolean;
    message: string;
    errorCode: string;
    errorId: string;
    attemptsRemaining?: number;
    suggestedAction?: string;
    timestamp: string;
    constructor(partial: Partial<PasswordResetErrorResponse>);
}
export declare class ResendTokenResponse {
    success: boolean;
    message: string;
    maskedEmail: string;
    expiresIn: number;
    cooldownPeriod: number;
    sentAt: string;
    constructor(partial: Partial<ResendTokenResponse>);
}
