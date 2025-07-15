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
exports.SecurityLogAdapter = exports.ExternalAuthAdapter = exports.LoginRequestAdapter = exports.UserRO = void 0;
class UserRO {
    status;
    message;
    data;
    constructor(init) {
        Object.assign(this, init);
    }
}
exports.UserRO = UserRO;
const class_transformer_1 = require("class-transformer");
class LoginRequestAdapter {
    email;
    password;
    rememberMe;
    ipAddress;
    userAgent;
    deviceId;
    loginAttemptTime;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.LoginRequestAdapter = LoginRequestAdapter;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], LoginRequestAdapter.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRequestAdapter.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => Boolean(value)),
    __metadata("design:type", Boolean)
], LoginRequestAdapter.prototype, "rememberMe", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRequestAdapter.prototype, "ipAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRequestAdapter.prototype, "userAgent", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRequestAdapter.prototype, "deviceId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date()),
    __metadata("design:type", Date)
], LoginRequestAdapter.prototype, "loginAttemptTime", void 0);
class ExternalAuthAdapter {
    email;
    externalId;
    provider;
    tokenExpiry;
    providerData;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ExternalAuthAdapter = ExternalAuthAdapter;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], ExternalAuthAdapter.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => `EXT_${value}`),
    __metadata("design:type", String)
], ExternalAuthAdapter.prototype, "externalId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ExternalAuthAdapter.prototype, "provider", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], ExternalAuthAdapter.prototype, "tokenExpiry", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => JSON.parse(value)),
    __metadata("design:type", Object)
], ExternalAuthAdapter.prototype, "providerData", void 0);
class SecurityLogAdapter {
    userId;
    email;
    ipAddress;
    userAgent;
    deviceId;
    success;
    failureReason;
    timestamp;
    platform;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.SecurityLogAdapter = SecurityLogAdapter;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityLogAdapter.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], SecurityLogAdapter.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityLogAdapter.prototype, "ipAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityLogAdapter.prototype, "userAgent", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityLogAdapter.prototype, "deviceId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], SecurityLogAdapter.prototype, "success", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecurityLogAdapter.prototype, "failureReason", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date()),
    __metadata("design:type", Date)
], SecurityLogAdapter.prototype, "timestamp", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value || 'web'),
    __metadata("design:type", String)
], SecurityLogAdapter.prototype, "platform", void 0);
//# sourceMappingURL=adapter.dto.js.map