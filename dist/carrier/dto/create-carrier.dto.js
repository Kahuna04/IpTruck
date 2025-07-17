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
exports.CreateCarrierDto = exports.CompanySize = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var CompanySize;
(function (CompanySize) {
    CompanySize["SMALL"] = "SMALL";
    CompanySize["MEDIUM"] = "MEDIUM";
    CompanySize["LARGE"] = "LARGE";
    CompanySize["ENTERPRISE"] = "ENTERPRISE";
})(CompanySize || (exports.CompanySize = CompanySize = {}));
class CreateCarrierDto {
    userId;
    companyName;
    registrationNumber;
    taxId;
    businessEmail;
    phoneNumber;
    website;
    companySize;
    description;
    street;
    city;
    state;
    postalCode;
    countryCode;
    contactFirstName;
    contactLastName;
    contactJobTitle;
    contactPhone;
    contactEmail;
    fleetSize;
    operatingRegions;
    marketingOptIn;
}
exports.CreateCarrierDto = CreateCarrierDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[A-Z0-9-]+$/, {
        message: 'Registration number must contain only uppercase letters, numbers, and hyphens',
    }),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(9),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Tax ID must contain only numbers' }),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "taxId", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid business email address' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "businessEmail", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('NG', {
        message: 'Please provide a valid Nigerian phone number',
    }),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'Please provide a valid website URL' }),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CompanySize, {
        message: 'Company size must be SMALL, MEDIUM, LARGE, or ENTERPRISE',
    }),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "companySize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 10),
    (0, class_validator_1.Matches)(/^[0-9]{5,10}$/, { message: 'Postal code must be 5-10 digits' }),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "postalCode", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 3),
    (0, class_validator_1.Matches)(/^[A-Z]{2,3}$/, {
        message: 'Country code must be 2-3 uppercase letters',
    }),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "countryCode", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s'-]+$/, {
        message: 'First name must contain only letters, spaces, hyphens, and apostrophes',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "contactFirstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s'-]+$/, {
        message: 'Last name must contain only letters, spaces, hyphens, and apostrophes',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "contactLastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "contactJobTitle", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('NG', {
        message: 'Please provide a valid Nigerian phone number for the contact person',
    }),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "contactPhone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address for the contact person' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "contactEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "fleetSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateCarrierDto.prototype, "operatingRegions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateCarrierDto.prototype, "marketingOptIn", void 0);
//# sourceMappingURL=create-carrier.dto.js.map