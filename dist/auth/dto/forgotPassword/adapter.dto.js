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
exports.TokenValidationAdapter = exports.PasswordResetCompleteAdapter = exports.SecurityAuditAdapter = exports.SMSNotificationAdapter = exports.EmailNotificationAdapter = exports.PasswordResetRequestAdapter = exports.ForgotPasswordRO = void 0;
class ForgotPasswordRO {
    status;
    message;
    data;
    constructor(init) {
        Object.assign(this, init);
    }
}
exports.ForgotPasswordRO = ForgotPasswordRO;
const class_transformer_1 = require("class-transformer");
class PasswordResetRequestAdapter {
    email;
    resetMethod;
    ipAddress;
    userAgent;
    deviceId;
    requestedAt;
    expiresAt;
    token;
    status;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.PasswordResetRequestAdapter = PasswordResetRequestAdapter;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], PasswordResetRequestAdapter.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value || 'email'),
    __metadata("design:type", String)
], PasswordResetRequestAdapter.prototype, "resetMethod", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetRequestAdapter.prototype, "ipAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetRequestAdapter.prototype, "userAgent", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetRequestAdapter.prototype, "deviceId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date()),
    __metadata("design:type", Date)
], PasswordResetRequestAdapter.prototype, "requestedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(Date.now() + 30 * 60 * 1000)),
    __metadata("design:type", Date)
], PasswordResetRequestAdapter.prototype, "expiresAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
    __metadata("design:type", String)
], PasswordResetRequestAdapter.prototype, "token", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => 'pending'),
    __metadata("design:type", String)
], PasswordResetRequestAdapter.prototype, "status", void 0);
class EmailNotificationAdapter {
    recipientEmail;
    companyName;
    contactFirstName;
    contactLastName;
    resetToken;
    resetUrl;
    expiryTime;
    templateType;
    priority;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.EmailNotificationAdapter = EmailNotificationAdapter;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], EmailNotificationAdapter.prototype, "recipientEmail", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmailNotificationAdapter.prototype, "companyName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmailNotificationAdapter.prototype, "contactFirstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmailNotificationAdapter.prototype, "contactLastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmailNotificationAdapter.prototype, "resetToken", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => `${process.env.FRONTEND_URL}/reset-password?token=${value}`),
    __metadata("design:type", String)
], EmailNotificationAdapter.prototype, "resetUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(Date.now() + 30 * 60 * 1000).toLocaleString()),
    __metadata("design:type", String)
], EmailNotificationAdapter.prototype, "expiryTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => 'password_reset'),
    __metadata("design:type", String)
], EmailNotificationAdapter.prototype, "templateType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => 'high'),
    __metadata("design:type", String)
], EmailNotificationAdapter.prototype, "priority", void 0);
class SMSNotificationAdapter {
    recipientPhone;
    companyName;
    contactFirstName;
    resetToken;
    message;
    senderId;
    messageType;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.SMSNotificationAdapter = SMSNotificationAdapter;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.replace(/\D/g, '').replace(/^0/, '234')),
    __metadata("design:type", String)
], SMSNotificationAdapter.prototype, "recipientPhone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SMSNotificationAdapter.prototype, "companyName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SMSNotificationAdapter.prototype, "contactFirstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SMSNotificationAdapter.prototype, "resetToken", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => `Your password reset code: ${value}. Valid for 30 minutes. If you didn't request this, please ignore.`),
    __metadata("design:type", String)
], SMSNotificationAdapter.prototype, "message", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => 'LogiTruck'),
    __metadata("design:type", String)
], SMSNotificationAdapter.prototype, "senderId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => 'password_reset'),
    __metadata("design:type", String)
], SMSNotificationAdapter.prototype, "messageType", void 0);
class SecurityAuditAdapter {
    userId;
    email;
    ipAddress;
    userAgent;
    deviceId;
    action;
    success;
    failureReason;
    timestamp;
    platform;
    additionalData;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.SecurityAuditAdapter = SecurityAuditAdapter;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityAuditAdapter.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], SecurityAuditAdapter.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityAuditAdapter.prototype, "ipAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityAuditAdapter.prototype, "userAgent", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityAuditAdapter.prototype, "deviceId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityAuditAdapter.prototype, "action", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], SecurityAuditAdapter.prototype, "success", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityAuditAdapter.prototype, "failureReason", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date()),
    __metadata("design:type", Date)
], SecurityAuditAdapter.prototype, "timestamp", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value || 'web'),
    __metadata("design:type", String)
], SecurityAuditAdapter.prototype, "platform", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], SecurityAuditAdapter.prototype, "additionalData", void 0);
class PasswordResetCompleteAdapter {
    userId;
    email;
    passwordChangedAt;
    lastLoginAt;
    accountStatus;
    forceRelogin;
    ipAddress;
    userAgent;
    deviceId;
    newPassword;
    oldPasswordHash;
    resetToken;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.PasswordResetCompleteAdapter = PasswordResetCompleteAdapter;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetCompleteAdapter.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], PasswordResetCompleteAdapter.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date()),
    __metadata("design:type", Date)
], PasswordResetCompleteAdapter.prototype, "passwordChangedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date()),
    __metadata("design:type", Date)
], PasswordResetCompleteAdapter.prototype, "lastLoginAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => 'active'),
    __metadata("design:type", String)
], PasswordResetCompleteAdapter.prototype, "accountStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => true),
    __metadata("design:type", Boolean)
], PasswordResetCompleteAdapter.prototype, "forceRelogin", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetCompleteAdapter.prototype, "ipAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetCompleteAdapter.prototype, "userAgent", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PasswordResetCompleteAdapter.prototype, "deviceId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], PasswordResetCompleteAdapter.prototype, "newPassword", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], PasswordResetCompleteAdapter.prototype, "oldPasswordHash", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], PasswordResetCompleteAdapter.prototype, "resetToken", void 0);
class TokenValidationAdapter {
    email;
    token;
    validatedAt;
    isValid;
    expiresAt;
    secondsUntilExpiry;
    ipAddress;
    userAgent;
    attemptCount;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.TokenValidationAdapter = TokenValidationAdapter;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], TokenValidationAdapter.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TokenValidationAdapter.prototype, "token", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date()),
    __metadata("design:type", Date)
], TokenValidationAdapter.prototype, "validatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], TokenValidationAdapter.prototype, "isValid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], TokenValidationAdapter.prototype, "expiresAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => Math.max(0, Math.floor((new Date(value).getTime() - new Date().getTime()) / 1000))),
    __metadata("design:type", Number)
], TokenValidationAdapter.prototype, "secondsUntilExpiry", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TokenValidationAdapter.prototype, "ipAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TokenValidationAdapter.prototype, "userAgent", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], TokenValidationAdapter.prototype, "attemptCount", void 0);
//# sourceMappingURL=adapter.dto.js.map