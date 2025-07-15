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
exports.UpdateBidDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_bid_dto_1 = require("./create-bid.dto");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
class UpdateBidDto extends (0, swagger_1.PartialType)(create_bid_dto_1.CreateBidDto) {
    status;
    message;
    bidAmount;
    proposedPickupTime;
    estimatedDeliveryTime;
    responseMessage;
    bidExpiresAt;
    paymentTerms;
    specialTerms;
}
exports.UpdateBidDto = UpdateBidDto;
__decorate([
    (0, swagger_2.ApiProperty)({
        example: client_1.BidStatus.ACCEPTED,
        description: 'Updated bid status',
        enum: client_1.BidStatus
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.BidStatus),
    __metadata("design:type", String)
], UpdateBidDto.prototype, "status", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        example: 'Updated proposal with better terms',
        description: 'Updated message or proposal details'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateBidDto.prototype, "message", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        example: 150000,
        description: 'Updated bid amount'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1000),
    __metadata("design:type", Number)
], UpdateBidDto.prototype, "bidAmount", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        example: '2024-07-16T08:00:00Z',
        description: 'Updated proposed pickup time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateBidDto.prototype, "proposedPickupTime", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        example: '2024-07-16T16:00:00Z',
        description: 'Updated estimated delivery time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateBidDto.prototype, "estimatedDeliveryTime", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        example: 'Counter-offer: Can do it for 140k with same terms',
        description: 'Response message from shipper'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateBidDto.prototype, "responseMessage", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        example: '2024-07-17T23:59:59Z',
        description: 'Updated bid expiration time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateBidDto.prototype, "bidExpiresAt", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        example: 'Payment terms updated to 50% upfront',
        description: 'Updated payment terms'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateBidDto.prototype, "paymentTerms", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        example: 'Updated special terms and conditions',
        description: 'Updated special terms'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateBidDto.prototype, "specialTerms", void 0);
//# sourceMappingURL=update-bid.dto.js.map