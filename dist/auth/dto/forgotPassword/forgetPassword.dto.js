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
exports.ResendResetTokenDto = exports.ResetPasswordDto = exports.VerifyResetTokenDto = exports.ForgotPasswordDto = exports.ResetMethod = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var ResetMethod;
(function (ResetMethod) {
    ResetMethod["EMAIL"] = "email";
    ResetMethod["SMS"] = "sms";
    ResetMethod["BOTH"] = "both";
})(ResetMethod || (exports.ResetMethod = ResetMethod = {}));
class ForgotPasswordDto {
    email;
    resetMethod;
    ipAddress;
    userAgent;
    deviceId;
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'contact@kahuna-logistics.com',
        description: 'Company email address for password reset'
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'email',
        description: 'Preferred method for receiving reset instructions',
        enum: ResetMethod,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ResetMethod, { message: 'Reset method must be email, sms, or both' }),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "resetMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '192.168.1.100',
        description: 'Client IP address for security logging',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIP)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        description: 'Client user agent for security logging',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Device fingerprint for security',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "deviceId", void 0);
class VerifyResetTokenDto {
    email;
    token;
    ipAddress;
}
exports.VerifyResetTokenDto = VerifyResetTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'contact@kahuna-logistics.com',
        description: 'Company email address'
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], VerifyResetTokenDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
        description: 'Password reset token from email/SMS'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(32, { message: 'Reset token must be at least 32 characters' }),
    (0, class_validator_1.MaxLength)(128, { message: 'Reset token must not exceed 128 characters' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9]+$/, { message: 'Reset token must contain only alphanumeric characters' }),
    __metadata("design:type", String)
], VerifyResetTokenDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '192.168.1.100',
        description: 'Client IP address for security verification',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIP)(),
    __metadata("design:type", String)
], VerifyResetTokenDto.prototype, "ipAddress", void 0);
class ResetPasswordDto {
    email;
    token;
    newPassword;
    confirmPassword;
    ipAddress;
    userAgent;
    deviceId;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'contact@kahuna-logistics.com',
        description: 'Company email address'
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
        description: 'Password reset token from email/SMS'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(32, { message: 'Reset token must be at least 32 characters' }),
    (0, class_validator_1.MaxLength)(128, { message: 'Reset token must not exceed 128 characters' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9]+$/, { message: 'Reset token must contain only alphanumeric characters' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NewPassword@123',
        description: 'New password for the account'
    }),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1,
    }, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NewPassword@123',
        description: 'Confirm new password'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '192.168.1.100',
        description: 'Client IP address for security logging',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIP)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        description: 'Client user agent for security logging',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Device fingerprint for security',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "deviceId", void 0);
class ResendResetTokenDto {
    email;
    resetMethod;
    ipAddress;
}
exports.ResendResetTokenDto = ResendResetTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'contact@kahuna-logistics.com',
        description: 'Company email address'
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], ResendResetTokenDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'email',
        description: 'Preferred method for receiving reset instructions',
        enum: ResetMethod,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ResetMethod, { message: 'Reset method must be email, sms, or both' }),
    __metadata("design:type", String)
], ResendResetTokenDto.prototype, "resetMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '192.168.1.100',
        description: 'Client IP address for security logging',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIP)(),
    __metadata("design:type", String)
], ResendResetTokenDto.prototype, "ipAddress", void 0);
//# sourceMappingURL=forgetPassword.dto.js.map