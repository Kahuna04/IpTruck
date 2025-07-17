"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendTokenResponse = exports.PasswordResetErrorResponse = exports.ResetPasswordResponse = exports.VerifyTokenResponse = exports.ForgetPasswordResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class ForgetPasswordResponse {
    success;
    message;
    maskedEmail;
    maskedPhone;
    deliveryMethod;
    expiresIn;
    sentAt;
    referenceId;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ForgetPasswordResponse = ForgetPasswordResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ForgetPasswordResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Password reset instructions sent successfully' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ForgetPasswordResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'c***l@kahuna-logistics.com' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const [local, domain] = value.split('@');
        const maskedLocal = local.charAt(0) +
            '*'.repeat(local.length - 2) +
            local.charAt(local.length - 1);
        return `${maskedLocal}@${domain}`;
    }),
    __metadata("design:type", String)
], ForgetPasswordResponse.prototype, "maskedEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '***-***-5678' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ForgetPasswordResponse.prototype, "maskedPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'email' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ForgetPasswordResponse.prototype, "deliveryMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1800 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ForgetPasswordResponse.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-14T10:30:00Z' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date().toISOString()),
    __metadata("design:type", String)
], ForgetPasswordResponse.prototype, "sentAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PWD_RESET_001' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ForgetPasswordResponse.prototype, "referenceId", void 0);
class VerifyTokenResponse {
    success;
    message;
    isValid;
    maskedEmail;
    expiresIn;
    expiresAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.VerifyTokenResponse = VerifyTokenResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], VerifyTokenResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Reset token is valid' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], VerifyTokenResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], VerifyTokenResponse.prototype, "isValid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contact@kahuna-logistics.com' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const [local, domain] = value.split('@');
        const maskedLocal = local.charAt(0) +
            '*'.repeat(local.length - 2) +
            local.charAt(local.length - 1);
        return `${maskedLocal}@${domain}`;
    }),
    __metadata("design:type", String)
], VerifyTokenResponse.prototype, "maskedEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1200 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], VerifyTokenResponse.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-14T11:00:00Z' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toISOString()),
    __metadata("design:type", String)
], VerifyTokenResponse.prototype, "expiresAt", void 0);
class ResetPasswordResponse {
    success;
    message;
    maskedEmail;
    resetCompletedAt;
    requiresRelogin;
    nextSteps;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ResetPasswordResponse = ResetPasswordResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ResetPasswordResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Password reset successfully' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResetPasswordResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contact@kahuna-logistics.com' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const [local, domain] = value.split('@');
        const maskedLocal = local.charAt(0) +
            '*'.repeat(local.length - 2) +
            local.charAt(local.length - 1);
        return `${maskedLocal}@${domain}`;
    }),
    __metadata("design:type", String)
], ResetPasswordResponse.prototype, "maskedEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-14T10:30:00Z' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date().toISOString()),
    __metadata("design:type", String)
], ResetPasswordResponse.prototype, "resetCompletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ResetPasswordResponse.prototype, "requiresRelogin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Your password has been updated. Please log in with your new password.',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResetPasswordResponse.prototype, "nextSteps", void 0);
class PasswordResetErrorResponse {
    success;
    message;
    errorCode;
    errorId;
    attemptsRemaining;
    suggestedAction;
    timestamp;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.PasswordResetErrorResponse = PasswordResetErrorResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], PasswordResetErrorResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Invalid or expired reset token' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetErrorResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TOKEN_EXPIRED' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetErrorResponse.prototype, "errorCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PWD_ERR_001' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetErrorResponse.prototype, "errorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PasswordResetErrorResponse.prototype, "attemptsRemaining", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Request a new password reset link' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetErrorResponse.prototype, "suggestedAction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-14T10:30:00Z' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date().toISOString()),
    __metadata("design:type", String)
], PasswordResetErrorResponse.prototype, "timestamp", void 0);
class ResendTokenResponse {
    success;
    message;
    maskedEmail;
    expiresIn;
    cooldownPeriod;
    sentAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ResendTokenResponse = ResendTokenResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ResendTokenResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New password reset instructions sent' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResendTokenResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'c***l@kahuna-logistics.com' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const [local, domain] = value.split('@');
        const maskedLocal = local.charAt(0) +
            '*'.repeat(local.length - 2) +
            local.charAt(local.length - 1);
        return `${maskedLocal}@${domain}`;
    }),
    __metadata("design:type", String)
], ResendTokenResponse.prototype, "maskedEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1800 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ResendTokenResponse.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 900 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ResendTokenResponse.prototype, "cooldownPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-14T10:30:00Z' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date().toISOString()),
    __metadata("design:type", String)
], ResendTokenResponse.prototype, "sentAt", void 0);
//# sourceMappingURL=response.dto.js.map