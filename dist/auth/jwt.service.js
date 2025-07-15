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
var JwtHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHandler = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let JwtHandler = JwtHandler_1 = class JwtHandler {
    jwtService;
    config;
    logger;
    constructor(jwtService, config) {
        this.jwtService = jwtService;
        this.config = config;
        this.logger = new common_1.Logger(JwtHandler_1.name);
        this.SECRET = this.config.get('JWT_AT_SECRET') || 'fallback_secret';
        this.RT_SECRET = this.config.get('JWT_RT_SECRET') || 'fallback_rt_secret';
        this.TOKEN_EXPIRATION = this.config.get('TOKEN_EXPIRATION') || '15m';
        this.RT_EXPIRATION = this.config.get('REFRESH_TOKEN_EXPIRATION') || '7d';
    }
    SECRET;
    RT_SECRET;
    TOKEN_EXPIRATION;
    RT_EXPIRATION;
    async generateTokens(payload) {
        try {
            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync(payload, {
                    secret: this.SECRET,
                    expiresIn: this.TOKEN_EXPIRATION,
                }),
                this.jwtService.signAsync(payload, {
                    secret: this.RT_SECRET,
                    expiresIn: this.RT_EXPIRATION,
                }),
            ]);
            console.log(`Generated Access Token: ${accessToken}`);
            console.log(`Generated Refresh Token: ${refreshToken}`);
            return { accessToken, refreshToken };
        }
        catch (error) {
            this.logger.error(JSON.stringify(error));
            throw new common_1.InternalServerErrorException('Failed to generate tokens');
        }
    }
    async generateResetToken(email) {
        try {
            const resetToken = await this.jwtService.signAsync({ email }, {
                secret: this.SECRET,
                expiresIn: this.TOKEN_EXPIRATION,
            });
            return resetToken;
        }
        catch (error) {
            this.logger.error(JSON.stringify(error));
            throw new common_1.InternalServerErrorException('Failed to generate reset token');
        }
    }
    async verifyToken(token) {
        try {
            return await this.jwtService.verifyAsync(token, { secret: this.SECRET });
        }
        catch (error) {
            this.logger.log('error occurred verifying token', error.message);
            if (error.name === 'TokenExpiredError') {
                throw new common_1.BadRequestException('Token has expired');
            }
            else {
                throw new common_1.BadRequestException('Invalid Token');
            }
        }
    }
};
exports.JwtHandler = JwtHandler;
exports.JwtHandler = JwtHandler = JwtHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], JwtHandler);
//# sourceMappingURL=jwt.service.js.map