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
exports.CreateTruckDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../../shared/constants");
class CreateTruckDto {
    makeModel;
    year;
    licensePlate;
    maxPayload;
    cargoVolume;
    truckType;
    condition;
    mileage;
    equipment;
    availableServices;
    photoUrl;
    insuranceNumber;
    insuranceExpiryDate;
    driverName;
    driverLicenseNumber;
    driverLicenseExpiry;
    driverExperience;
    driverPhone;
    driverRating;
    isActive;
}
exports.CreateTruckDto = CreateTruckDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "makeModel", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear() + 1),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.Matches)(/^[A-Z0-9-]+$/, {
        message: 'License plate must contain only uppercase letters, numbers, and hyphens',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value?.toUpperCase().trim()),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "licensePlate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "maxPayload", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "cargoVolume", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(constants_1.TRUCK_TYPES, { message: 'Invalid truck type' }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "truckType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "condition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2000000),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "mileage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MaxLength)(100, { each: true }),
    __metadata("design:type", Array)
], CreateTruckDto.prototype, "equipment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MaxLength)(100, { each: true }),
    __metadata("design:type", Array)
], CreateTruckDto.prototype, "availableServices", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'Please provide a valid photo URL' }),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "photoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "insuranceNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "insuranceExpiryDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s'-]+$/, {
        message: 'Driver name must contain only letters, spaces, hyphens, and apostrophes',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "driverName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "driverLicenseNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "driverLicenseExpiry", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "driverExperience", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)('NG', {
        message: 'Please provide a valid Nigerian phone number for the driver',
    }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "driverPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "driverRating", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateTruckDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-truck.dto.js.map