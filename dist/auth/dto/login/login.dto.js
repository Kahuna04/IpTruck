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
exports.TwoFactorLoginDto = exports.LoginDto = exports.LoginType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var LoginType;
(function (LoginType) {
    LoginType["EMAIL"] = "email";
    LoginType["PHONE"] = "phone";
})(LoginType || (exports.LoginType = LoginType = {}));
class LoginDto {
    email;
    password;
    rememberMe;
    ipAddress;
    userAgent;
    deviceId;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'contact@kahuna-logistics.com',
        description: 'Company email address',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Password@123',
        description: 'Account password',
        minLength: 1,
        maxLength: 128,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: 'Password is required' }),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Remember login session for extended period',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], LoginDto.prototype, "rememberMe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '192.168.1.100',
        description: 'Client IP address for security logging',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIP)(),
    __metadata("design:type", String)
], LoginDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        description: 'Client user agent for security logging',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], LoginDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Device fingerprint for security',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LoginDto.prototype, "deviceId", void 0);
class TwoFactorLoginDto {
    email;
    verificationCode;
    sessionToken;
}
exports.TwoFactorLoginDto = TwoFactorLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'contact@kahuna-logistics.com',
        description: 'Company email address',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], TwoFactorLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
        description: '6-digit verification code',
        minLength: 6,
        maxLength: 6,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Verification code must be 6 digits' }),
    (0, class_validator_1.MaxLength)(6, { message: 'Verification code must be 6 digits' }),
    __metadata("design:type", String)
], TwoFactorLoginDto.prototype, "verificationCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Session token from initial login',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TwoFactorLoginDto.prototype, "sessionToken", void 0);
//# sourceMappingURL=login.dto.js.map