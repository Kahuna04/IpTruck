"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_at_strategy_1 = require("./strategies/jwt_at.strategy");
const jwt_rt_strategy_1 = require("./strategies/jwt_rt.strategy");
const jwt_service_1 = require("./jwt.service");
const helper_service_1 = require("../shared/helper.service");
const prisma_module_1 = require("../prisma/prisma.module");
const shipper_module_1 = require("../shipper/shipper.module");
const carrier_module_1 = require("../carrier/carrier.module");
const email_module_1 = require("../email/email.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            shipper_module_1.ShipperModule,
            carrier_module_1.CarrierModule,
            email_module_1.EmailModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.get('JWT_AT_SECRET') || 'default-secret',
                    signOptions: { expiresIn: '15m' },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_at_strategy_1.JwtStrategy,
            jwt_rt_strategy_1.RtStrategy,
            helper_service_1.HelperService,
            jwt_service_1.JwtHandler,
            jwt_1.JwtService,
        ],
        exports: [jwt_1.JwtService, auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map