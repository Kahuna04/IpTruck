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
exports.BidResponseDto = exports.CreateBidDto = exports.DriverDetailsDto = exports.TruckDetailsDto = exports.TruckCondition = exports.UpdateBidDto = exports.BidStatus = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "BidStatus", { enumerable: true, get: function () { return client_1.BidStatus; } });
var update_bid_dto_1 = require("./update-bid.dto");
Object.defineProperty(exports, "UpdateBidDto", { enumerable: true, get: function () { return update_bid_dto_1.UpdateBidDto; } });
var TruckCondition;
(function (TruckCondition) {
    TruckCondition["NEW"] = "new";
    TruckCondition["EXCELLENT"] = "excellent";
    TruckCondition["GOOD"] = "good";
    TruckCondition["FAIR"] = "fair";
    TruckCondition["POOR"] = "poor";
})(TruckCondition || (exports.TruckCondition = TruckCondition = {}));
class TruckDetailsDto {
    makeModel;
    year;
    licensePlate;
    maxPayload;
    cargoVolume;
    condition;
    mileage;
    equipment;
    availableServices;
    photoUrl;
    insuranceNumber;
    insuranceExpiryDate;
}
exports.TruckDetailsDto = TruckDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mercedes-Benz Actros',
        description: 'Truck make and model',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], TruckDetailsDto.prototype, "makeModel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2020,
        description: 'Year of manufacture',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1990),
    (0, class_validator_1.Max)(2030),
    __metadata("design:type", Number)
], TruckDetailsDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ABC123DE',
        description: 'License plate number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], TruckDetailsDto.prototype, "licensePlate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 25000,
        description: 'Maximum payload capacity in kg',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(50000),
    __metadata("design:type", Number)
], TruckDetailsDto.prototype, "maxPayload", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 85,
        description: 'Cargo volume capacity in cubic meters',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", Number)
], TruckDetailsDto.prototype, "cargoVolume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: TruckCondition.GOOD,
        description: 'Overall condition of the truck',
    }),
    (0, class_validator_1.IsEnum)(TruckCondition),
    __metadata("design:type", String)
], TruckDetailsDto.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 150000,
        description: 'Odometer reading in kilometers',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], TruckDetailsDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'GPS tracking, temperature monitoring',
        description: 'Available equipment and features',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], TruckDetailsDto.prototype, "equipment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['GPS_TRACKING', 'TEMPERATURE_CONTROL', 'LOADING_ASSISTANCE'],
        description: 'Available services',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TruckDetailsDto.prototype, "availableServices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/truck-photo.jpg',
        description: 'URL to truck photo',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], TruckDetailsDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'INS12345',
        description: 'Insurance policy number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], TruckDetailsDto.prototype, "insuranceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-31',
        description: 'Insurance expiry date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TruckDetailsDto.prototype, "insuranceExpiryDate", void 0);
class DriverDetailsDto {
    fullName;
    licenseNumber;
    licenseExpiryDate;
    experienceYears;
    contactPhone;
    rating;
    completedTrips;
    certifications;
}
exports.DriverDetailsDto = DriverDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Smith',
        description: 'Driver full name',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], DriverDetailsDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'DL12345678',
        description: 'Driver license number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], DriverDetailsDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-06-30',
        description: 'License expiry date',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DriverDetailsDto.prototype, "licenseExpiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 8,
        description: 'Years of driving experience',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], DriverDetailsDto.prototype, "experienceYears", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+234-80-9876-5432',
        description: 'Driver contact phone',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], DriverDetailsDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4.8,
        description: 'Driver rating out of 5',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], DriverDetailsDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 245,
        description: 'Number of completed trips',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], DriverDetailsDto.prototype, "completedTrips", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['HAZMAT', 'REFRIGERATED_TRANSPORT'],
        description: 'Special certifications',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], DriverDetailsDto.prototype, "certifications", void 0);
class CreateBidDto {
    bookingId;
    carrierId;
    bidAmount;
    currency = 'NGN';
    proposedPickupTime;
    estimatedDeliveryTime;
    truckDetails;
    driverDetails;
    message;
    includedServices;
    bidExpiresAt;
    isNegotiable = true;
    paymentTerms;
    specialTerms;
    minimumAcceptablePrice;
    documentationUrl;
    contactPerson;
    contactPhone;
    contactEmail;
}
exports.CreateBidDto = CreateBidDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'booking-uuid-123',
        description: 'Booking ID this bid is for',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBidDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'carrier-uuid-123',
        description: 'Carrier ID making the bid',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBidDto.prototype, "carrierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 145000,
        description: 'Bid amount in Naira',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1000),
    (0, class_validator_1.Max)(10000000),
    __metadata("design:type", Number)
], CreateBidDto.prototype, "bidAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NGN',
        description: 'Currency code',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(3),
    __metadata("design:type", String)
], CreateBidDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-07-15T06:00:00Z',
        description: 'Proposed pickup time',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBidDto.prototype, "proposedPickupTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-07-15T14:00:00Z',
        description: 'Estimated delivery time',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBidDto.prototype, "estimatedDeliveryTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Truck details for this bid',
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TruckDetailsDto),
    __metadata("design:type", TruckDetailsDto)
], CreateBidDto.prototype, "truckDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Driver details for this bid',
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DriverDetailsDto),
    __metadata("design:type", DriverDetailsDto)
], CreateBidDto.prototype, "driverDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Reliable service with 10 years experience. Fully insured.',
        description: 'Additional message or proposal details',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateBidDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['GPS_TRACKING', 'REAL_TIME_UPDATES', 'PHOTO_PROOF'],
        description: 'Services included in this bid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateBidDto.prototype, "includedServices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-07-16T23:59:59Z',
        description: 'Bid expiration time',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBidDto.prototype, "bidExpiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether this bid is negotiable',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateBidDto.prototype, "isNegotiable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Payment on delivery preferred',
        description: 'Payment terms and conditions',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateBidDto.prototype, "paymentTerms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Available for immediate pickup',
        description: 'Special terms or conditions',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateBidDto.prototype, "specialTerms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 130000,
        description: 'Minimum acceptable counter-offer',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateBidDto.prototype, "minimumAcceptablePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/company-docs.pdf',
        description: 'URL to additional documentation',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateBidDto.prototype, "documentationUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Contact person for this bid',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBidDto.prototype, "contactPerson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+234-80-1234-5678',
        description: 'Contact phone number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateBidDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'carrier@logistics.com',
        description: 'Contact email',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBidDto.prototype, "contactEmail", void 0);
class BidResponseDto {
    status;
    message;
    counterOfferAmount;
}
exports.BidResponseDto = BidResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: client_1.BidStatus.ACCEPTED,
        description: 'Response status',
        enum: client_1.BidStatus,
    }),
    (0, class_validator_1.IsEnum)(client_1.BidStatus),
    __metadata("design:type", String)
], BidResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'We accept your bid terms',
        description: 'Response message',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], BidResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 140000,
        description: 'Counter-offer amount if applicable',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], BidResponseDto.prototype, "counterOfferAmount", void 0);
//# sourceMappingURL=create-bid.dto.js.map