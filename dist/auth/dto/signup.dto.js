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
exports.CreateCompanyDto = exports.AddressDto = exports.CompanySize = exports.CompanyType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var CompanyType;
(function (CompanyType) {
    CompanyType["SHIPPER"] = "SHIPPER";
    CompanyType["CARRIER"] = "CARRIER";
    CompanyType["BOTH"] = "BOTH";
})(CompanyType || (exports.CompanyType = CompanyType = {}));
var CompanySize;
(function (CompanySize) {
    CompanySize["SMALL"] = "SMALL";
    CompanySize["MEDIUM"] = "MEDIUM";
    CompanySize["LARGE"] = "LARGE";
    CompanySize["ENTERPRISE"] = "ENTERPRISE";
})(CompanySize || (exports.CompanySize = CompanySize = {}));
class AddressDto {
    street;
    city;
    state;
    postalCode;
    countryCode;
}
exports.AddressDto = AddressDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AddressDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], AddressDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], AddressDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 10),
    (0, class_validator_1.Matches)(/^[0-9]{5,10}$/, { message: 'Postal code must be 5-10 digits' }),
    __metadata("design:type", String)
], AddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 3),
    (0, class_validator_1.Matches)(/^[A-Z]{2,3}$/, { message: 'Country code must be 2-3 uppercase letters' }),
    __metadata("design:type", String)
], AddressDto.prototype, "countryCode", void 0);
class CreateCompanyDto {
    userType;
    email;
    companyName;
    registrationNumber;
    taxId;
    address;
    businessEmail;
    phoneNumber;
    website;
    companyType;
    companySize;
    description;
    contactFirstName;
    contactLastName;
    contactJobTitle;
    contactPhone;
    contactEmail;
    password;
    acceptTerms;
    acceptPrivacy;
    marketingOptIn;
    expectedMonthlyVolume;
    fleetSize;
    operatingRegions;
}
exports.CreateCompanyDto = CreateCompanyDto;
__decorate([
    (0, class_validator_1.IsEnum)(CompanyType, { message: 'User type must be shipper or carrier' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "userType", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[A-Z0-9-]+$/, { message: 'Registration number must contain only uppercase letters, numbers, and hyphens' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(9),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Tax ID must contain only numbers' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "taxId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    __metadata("design:type", AddressDto)
], CreateCompanyDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid business email address' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "businessEmail", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('NG', { message: 'Please provide a valid Nigerian phone number' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'Please provide a valid website URL' }),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CompanyType, { message: 'Company type must be either shipper, carrier, or both' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "companyType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CompanySize, { message: 'Company size must be small, medium, large, or enterprise' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "companySize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s'-]+$/, { message: 'First name must contain only letters, spaces, hyphens, and apostrophes' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "contactFirstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s'-]+$/, { message: 'Last name must contain only letters, spaces, hyphens, and apostrophes' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "contactLastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "contactJobTitle", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('NG', { message: 'Please provide a valid Nigerian phone number for the contact person' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "contactPhone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address for the contact person' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase().trim()),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "contactEmail", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1,
    }, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^true$/, { message: 'You must accept the terms and conditions' }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true' ? 'true' : 'false'),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "acceptTerms", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^true$/, { message: 'You must accept the privacy policy' }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true' ? 'true' : 'false'),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "acceptPrivacy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateCompanyDto.prototype, "marketingOptIn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "expectedMonthlyVolume", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "fleetSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "operatingRegions", void 0);
//# sourceMappingURL=signup.dto.js.map