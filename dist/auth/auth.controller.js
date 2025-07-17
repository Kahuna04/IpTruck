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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const signup_dto_1 = require("./dto/signup.dto");
const login_dto_1 = require("./dto/login/login.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_at_guard_1 = require("./guards/jwt_at.guard");
const forgetPassword_dto_1 = require("./dto/forgotPassword/forgetPassword.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const auth_service_1 = require("./auth.service");
const jwt_rt_guard_1 = require("./guards/jwt_rt.guard");
const updateLocation_dto_1 = require("./dto/updateLocation.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    createUser(signupDetails) {
        return this.authService.createUser(signupDetails);
    }
    login(loginDetails) {
        return this.authService.login(loginDetails);
    }
    async logout(req) {
        await this.authService.logout(req.user['sub']);
        return 'You have successfully logout of the system, see you soon!';
    }
    async updateLocation(id, updateLocationDto) {
        return this.authService.updateLocation(id, updateLocationDto);
    }
    forgotPassword(forgotPasswordData) {
        return this.authService.forgotPassword(forgotPasswordData);
    }
    resetPassword(resetData) {
        return this.authService.resetPassword(resetData);
    }
    refreshToken(req) {
        const user = req.user;
        return this.authService.refreshToken(user['refreshToken'], user['payload']);
    }
    async testEmail(body) {
        try {
            await this.authService.testEmail(body.email);
            return { message: 'Test email sent successfully' };
        }
        catch (error) {
            return { error: 'Failed to send test email', details: error.message };
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Invalid Email or Password, Please check your login credentials',
    }),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_1.UseGuards)(jwt_at_guard_1.JwtGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('location/update/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateLocation_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Post)('password/forgot'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgetPassword_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('password/reset'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('refresh-token'),
    (0, common_1.UseGuards)(jwt_rt_guard_1.RefreshTokenGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('test-email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "testEmail", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('UserAuth'),
    (0, common_1.Controller)('auth'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map