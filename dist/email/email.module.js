"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const mailer_1 = require("@nestjs-modules/mailer");
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => ({
                    transport: {
                        host: config.get('SMTP_HOST') || 'smtp.gmail.com',
                        port: parseInt(config.get('SMTP_PORT') || '587'),
                        secure: parseInt(config.get('SMTP_PORT') || '587') === 465,
                        debug: true,
                        logger: true,
                        auth: {
                            user: config.get('USER_GMAIL'),
                            pass: config.get('GMAIL_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: config.get('USER_GMAIL'),
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, 'templates'),
                        adapter: new ejs_adapter_1.EjsAdapter(),
                        options: {
                            strict: false,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map