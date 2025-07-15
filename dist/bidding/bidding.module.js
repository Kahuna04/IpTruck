"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiddingModule = void 0;
const common_1 = require("@nestjs/common");
const bidding_controller_1 = require("./bidding.controller");
const bidding_service_1 = require("./bidding.service");
const prisma_module_1 = require("../prisma/prisma.module");
const helper_service_1 = require("../shared/helper.service");
const email_module_1 = require("../email/email.module");
let BiddingModule = class BiddingModule {
};
exports.BiddingModule = BiddingModule;
exports.BiddingModule = BiddingModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, email_module_1.EmailModule],
        controllers: [bidding_controller_1.BiddingController],
        providers: [bidding_service_1.BiddingService, helper_service_1.HelperService],
        exports: [bidding_service_1.BiddingService],
    })
], BiddingModule);
//# sourceMappingURL=bidding.module.js.map