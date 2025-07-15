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
exports.LogoutResponse = exports.LoginErrorResponse = exports.TwoFactorResponse = exports.LoginResponse = exports.UserProfileResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class UserProfileResponse {
    id;
    email;
    companyName;
    companyType;
    contactFirstName;
    contactLastName;
    contactJobTitle;
    isVerified;
    status;
    lastLoginAt;
    createdAt;
    password;
    passwordResetToken;
    twoFactorSecret;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.UserProfileResponse = UserProfileResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contact@kahuna-logistics.com' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Kahuna Logistics Ltd' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'shipper' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "companyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "contactFirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "contactLastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fleet Manager' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "contactJobTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], UserProfileResponse.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'active' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00Z' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toISOString()),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "lastLoginAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00Z' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toISOString()),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "passwordResetToken", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserProfileResponse.prototype, "twoFactorSecret", void 0);
class LoginResponse {
    success;
    message;
    accessToken;
    refreshToken;
    expiresIn;
    tokenType;
    user;
    permissions;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.LoginResponse = LoginResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], LoginResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Login successful' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3600 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], LoginResponse.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bearer' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "tokenType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserProfileResponse }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => UserProfileResponse),
    __metadata("design:type", UserProfileResponse)
], LoginResponse.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['dashboard', 'shipments', 'fleet'] }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], LoginResponse.prototype, "permissions", void 0);
class TwoFactorResponse {
    success;
    message;
    sessionToken;
    method;
    maskedContact;
    expiresIn;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.TwoFactorResponse = TwoFactorResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], TwoFactorResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Two-factor authentication required' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TwoFactorResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TwoFactorResponse.prototype, "sessionToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sms' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TwoFactorResponse.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '***-***-5678' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TwoFactorResponse.prototype, "maskedContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 300 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], TwoFactorResponse.prototype, "expiresIn", void 0);
class LoginErrorResponse {
    success;
    message;
    errorCode;
    errorId;
    attemptsRemaining;
    lockoutTimeRemaining;
    timestamp;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.LoginErrorResponse = LoginErrorResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], LoginErrorResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Invalid credentials' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginErrorResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'INVALID_CREDENTIALS' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginErrorResponse.prototype, "errorCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LOGIN_001' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginErrorResponse.prototype, "errorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], LoginErrorResponse.prototype, "attemptsRemaining", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 900 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], LoginErrorResponse.prototype, "lockoutTimeRemaining", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00Z' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toISOString()),
    __metadata("design:type", String)
], LoginErrorResponse.prototype, "timestamp", void 0);
class LogoutResponse {
    success;
    message;
    timestamp;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.LogoutResponse = LogoutResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], LogoutResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Logged out successfully' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LogoutResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00Z' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date().toISOString()),
    __metadata("design:type", String)
], LogoutResponse.prototype, "timestamp", void 0);
//# sourceMappingURL=response.dto.js.map