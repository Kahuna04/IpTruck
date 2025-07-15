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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../email/email.service");
const adapter_dto_1 = require("./dto/forgotPassword/adapter.dto");
const jwt_service_1 = require("./jwt.service");
const adapter_dto_2 = require("./dto/login/adapter.dto");
const helper_service_1 = require("../shared/helper.service");
const prisma_service_1 = require("../prisma/prisma.service");
const shipper_service_1 = require("../shipper/shipper.service");
const carrier_service_1 = require("../carrier/carrier.service");
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    emailService;
    helperService;
    shipperService;
    carrierService;
    logger;
    constructor(prisma, jwtService, emailService, helperService, shipperService, carrierService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.helperService = helperService;
        this.shipperService = shipperService;
        this.carrierService = carrierService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async createUser(userDetails) {
        let savedUser;
        const { email, password, userType, address, ...companyDetails } = userDetails;
        try {
            savedUser = await this.prisma.user.create({
                data: {
                    email,
                    password: await this.helperService.hashData(password),
                    userType: userType,
                },
            });
            if (userType === 'SHIPPER') {
                await this.shipperService.create({
                    ...companyDetails,
                    userId: savedUser.id,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postalCode,
                    countryCode: address.countryCode,
                });
            }
            else if (userType === 'CARRIER') {
                await this.carrierService.create({
                    ...companyDetails,
                    userId: savedUser.id,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postalCode,
                    countryCode: address.countryCode,
                });
            }
        }
        catch (error) {
            this.logger.error(`Error creating user: ${error.message}`, error.stack);
            throw new common_1.BadRequestException('Database error occurred');
        }
        const payload = { sub: savedUser.id, email: savedUser.email, userType: savedUser.userType };
        const { accessToken, refreshToken } = await this.jwtService.generateTokens(payload);
        await this.updateRefreshToken(savedUser.id, refreshToken);
        if (userType === 'SHIPPER') {
            await this.emailService.sendCompanyWelcomeEmail(userDetails, accessToken);
        }
        else {
            await this.emailService.sendCompanyWelcomeEmail(userDetails, accessToken);
        }
        return new adapter_dto_2.UserRO({
            status: 201,
            message: 'User registration successful',
            data: {
                accessToken,
                refreshToken,
            },
        });
    }
    async login(loginDetails) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDetails.email },
        });
        if (!user || !(await this.helperService.compareHash(loginDetails.password, user.password))) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const payload = { sub: user.id, email: user.email, userType: user.userType };
        const { accessToken, refreshToken } = await this.jwtService.generateTokens(payload);
        await this.updateRefreshToken(user.id, refreshToken);
        return new adapter_dto_2.UserRO({
            status: 200,
            message: 'Login successful',
            data: {
                accessToken,
                refreshToken,
            },
        });
    }
    async logout(id) {
        await this.prisma.user.update({
            where: { id },
            data: { refreshToken: null },
        });
    }
    forgotPassword = async (details) => {
        const { email } = details;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.BadRequestException('Reset instruction will be sent to only valid email!');
        const resetToken = await this.jwtService.generateResetToken(email);
        const hashedToken = await this.helperService.hashData(resetToken);
        try {
            await this.prisma.user.update({
                where: { id: user.id },
                data: { resetPasswordToken: hashedToken },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Database error occurred');
        }
        const userProfile = await this.getUserProfile(user.id);
        this.emailService.sendPasswordRecoveryEmail({
            email,
            name: userProfile?.contactFirstName || 'User',
            resetToken,
        });
        return new adapter_dto_1.ForgotPasswordRO({
            status: 200,
            message: 'Successful',
            data: 'Password recovery link has been sent your your email, Kindly check your mail',
        });
    };
    async resetPassword(resetData) {
        const { resetToken, newPassword, confirmPassword } = resetData;
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException('Password must be the same');
        }
        const payload = await this.jwtService.verifyToken(resetToken);
        const user = await this.prisma.user.findUnique({ where: { email: payload.email } });
        if (!user || !user.resetPasswordToken || !(await this.helperService.compareHash(resetToken, user.resetPasswordToken))) {
            throw new common_1.BadRequestException('Invalid Reset Password Token!!!');
        }
        try {
            const hashedPassword = await this.helperService.hashData(newPassword);
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    password: hashedPassword,
                    resetPasswordToken: null,
                },
            });
        }
        catch (error) {
            this.logger.error(`Error resetting password: ${error.message}`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
        return new adapter_dto_1.ForgotPasswordRO({
            status: 200,
            message: 'Successful',
            data: 'Your Password has been reset successfully, Kindly login with your new password',
        });
    }
    async refreshToken(refreshToken, payload) {
        const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
        if (user && user.refreshToken && (await this.helperService.compareHash(refreshToken, user.refreshToken))) {
            const { accessToken, refreshToken: newRefreshToken } = await this.jwtService.generateTokens(payload);
            await this.updateRefreshToken(payload.sub, newRefreshToken);
            return { accessToken, refreshToken: newRefreshToken };
        }
        throw new common_1.ForbiddenException('Access Denied!!!');
    }
    async updateRefreshToken(id, refreshToken) {
        const hashedRt = await this.helperService.hashData(refreshToken);
        try {
            await this.prisma.user.update({
                where: { id },
                data: { refreshToken: hashedRt },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Database error occurred');
        }
    }
    async updateLocation(id, updateLocationDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.user.update({
            where: { id },
            data: {
                lat: updateLocationDto.lat,
                lng: updateLocationDto.lng,
            },
        });
    }
    async getUserProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                shipper: true,
                carrier: true,
            },
        });
        if (!user)
            return null;
        return user.userType === 'SHIPPER' ? user.shipper : user.carrier;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_service_1.JwtHandler,
        email_service_1.EmailService,
        helper_service_1.HelperService,
        shipper_service_1.ShipperService,
        carrier_service_1.CarrierService])
], AuthService);
//# sourceMappingURL=auth.service.js.map