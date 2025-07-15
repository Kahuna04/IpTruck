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
exports.CreateBookingDto = exports.CargoDetailsDto = exports.LocationDto = exports.LoadingType = exports.TruckType = exports.CargoType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
var CargoType;
(function (CargoType) {
    CargoType["BEVERAGES"] = "beverages";
    CargoType["FOOD_PRODUCTS"] = "food_products";
    CargoType["ELECTRONICS"] = "electronics";
    CargoType["TEXTILES"] = "textiles";
    CargoType["CONSTRUCTION_MATERIALS"] = "construction_materials";
    CargoType["AUTOMOTIVE_PARTS"] = "automotive_parts";
    CargoType["CHEMICALS"] = "chemicals";
    CargoType["PHARMACEUTICALS"] = "pharmaceuticals";
    CargoType["MACHINERY"] = "machinery";
    CargoType["GENERAL_CARGO"] = "general_cargo";
    CargoType["HAZARDOUS_MATERIALS"] = "hazardous_materials";
    CargoType["PERISHABLES"] = "perishables";
    CargoType["FRAGILE_ITEMS"] = "fragile_items";
    CargoType["BULK_CARGO"] = "bulk_cargo";
    CargoType["LIQUID_CARGO"] = "liquid_cargo";
    CargoType["OTHER"] = "other";
})(CargoType || (exports.CargoType = CargoType = {}));
var TruckType;
(function (TruckType) {
    TruckType["FLATBED"] = "flatbed";
    TruckType["REFRIGERATED"] = "refrigerated";
    TruckType["DRY_VAN"] = "dry_van";
    TruckType["TANKER"] = "tanker";
    TruckType["CONTAINER"] = "container";
    TruckType["HEAVY_HAUL"] = "heavy_haul";
    TruckType["PICKUP"] = "pickup";
    TruckType["BOX_TRUCK"] = "box_truck";
    TruckType["DUMP_TRUCK"] = "dump_truck";
    TruckType["CEMENT_MIXER"] = "cement_mixer";
    TruckType["CRANE_TRUCK"] = "crane_truck";
    TruckType["LOWBOY"] = "lowboy";
    TruckType["STEP_DECK"] = "step_deck";
    TruckType["DOUBLE_DROP"] = "double_drop";
    TruckType["SIDE_LOADER"] = "side_loader";
    TruckType["CAR_CARRIER"] = "car_carrier";
    TruckType["LIVESTOCK"] = "livestock";
    TruckType["LOGGING"] = "logging";
    TruckType["GARBAGE"] = "garbage";
    TruckType["TOWING"] = "towing";
})(TruckType || (exports.TruckType = TruckType = {}));
var LoadingType;
(function (LoadingType) {
    LoadingType["SELF_LOADING"] = "self_loading";
    LoadingType["ASSISTED_LOADING"] = "assisted_loading";
    LoadingType["CRANE_REQUIRED"] = "crane_required";
    LoadingType["FORKLIFT_REQUIRED"] = "forklift_required";
    LoadingType["MANUAL_LOADING"] = "manual_loading";
})(LoadingType || (exports.LoadingType = LoadingType = {}));
class LocationDto {
    locationName;
    address;
    city;
    state;
    postalCode;
    countryCode;
    latitude;
    longitude;
    specialInstructions;
    contactPerson;
    contactPhone;
}
exports.LocationDto = LocationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Coca-Cola Bottling Plant',
        description: 'Name of the location (warehouse, factory, etc.)'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], LocationDto.prototype, "locationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123 Industrial Avenue',
        description: 'Street address'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], LocationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lagos',
        description: 'City'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], LocationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lagos State',
        description: 'State or province'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], LocationDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '100001',
        description: 'Postal code'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], LocationDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NG',
        description: 'Country code'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(3),
    __metadata("design:type", String)
], LocationDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 6.5244,
        description: 'Latitude coordinate'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], LocationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3.3792,
        description: 'Longitude coordinate'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], LocationDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Gate 3, loading dock B',
        description: 'Specific loading/unloading instructions'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], LocationDto.prototype, "specialInstructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Contact person at this location'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], LocationDto.prototype, "contactPerson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+234-80-1234-5678',
        description: 'Contact phone number'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], LocationDto.prototype, "contactPhone", void 0);
class CargoDetailsDto {
    description;
    type;
    weight;
    volume;
    length;
    width;
    height;
    quantity;
    unit;
    declaredValue;
    requiresRefrigeration;
    requiredTemperature;
    isFragile;
    isHazardous;
    hazardousClass;
    specialHandling;
}
exports.CargoDetailsDto = CargoDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Coca-Cola bottles and cans',
        description: 'Description of the cargo'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CargoDetailsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: CargoType.BEVERAGES,
        description: 'Type of cargo being transported'
    }),
    (0, class_validator_1.IsEnum)(CargoType),
    __metadata("design:type", String)
], CargoDetailsDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15000,
        description: 'Weight in kilograms'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(50000),
    __metadata("design:type", Number)
], CargoDetailsDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 45,
        description: 'Volume in cubic meters'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", Number)
], CargoDetailsDto.prototype, "volume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5.5,
        description: 'Length in meters'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Number)
], CargoDetailsDto.prototype, "length", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2.5,
        description: 'Width in meters'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CargoDetailsDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3.0,
        description: 'Height in meters'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(4.5),
    __metadata("design:type", Number)
], CargoDetailsDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1000,
        description: 'Number of packages/units'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CargoDetailsDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Cases',
        description: 'Unit of measurement (cases, pallets, boxes, etc.)'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CargoDetailsDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 50000,
        description: 'Declared value in Naira'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CargoDetailsDto.prototype, "declaredValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether cargo requires temperature control'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CargoDetailsDto.prototype, "requiresRefrigeration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4,
        description: 'Required temperature in Celsius (if refrigerated)'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-30),
    (0, class_validator_1.Max)(30),
    __metadata("design:type", Number)
], CargoDetailsDto.prototype, "requiredTemperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether cargo is fragile'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CargoDetailsDto.prototype, "isFragile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Whether cargo is hazardous'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CargoDetailsDto.prototype, "isHazardous", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'UN1234',
        description: 'UN number for hazardous materials'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CargoDetailsDto.prototype, "hazardousClass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Keep upright, do not stack',
        description: 'Special handling instructions'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CargoDetailsDto.prototype, "specialHandling", void 0);
class CreateBookingDto {
    referenceNumber;
    description;
    pickupLocation;
    deliveryLocation;
    cargoDetails;
    preferredTruckType;
    preferredPickupTime;
    latestPickupTime;
    requiredDeliveryTime;
    urgencyLevel;
    loadingType;
    unloadingType;
    proposedPrice;
    currency = 'NGN';
    minimumPrice;
    maximumPrice;
    isNegotiable = true;
    additionalRequirements;
    requiredServices;
    contactPerson;
    contactPhone;
    contactEmail;
    expiresAt;
    notificationsEnabled = true;
    isRecurring = false;
    recurrencePattern;
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BEV-DEL-001',
        description: 'Your internal reference number'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "referenceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Coca-Cola distribution to retailers',
        description: 'Brief description of the transport job'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pickup location details'
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LocationDto),
    __metadata("design:type", LocationDto)
], CreateBookingDto.prototype, "pickupLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Delivery location details'
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LocationDto),
    __metadata("design:type", LocationDto)
], CreateBookingDto.prototype, "deliveryLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cargo details'
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CargoDetailsDto),
    __metadata("design:type", CargoDetailsDto)
], CreateBookingDto.prototype, "cargoDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: TruckType.REFRIGERATED,
        description: 'Preferred truck type'
    }),
    (0, class_validator_1.IsEnum)(TruckType),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "preferredTruckType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-07-15T08:00:00Z',
        description: 'Preferred pickup date and time'
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "preferredPickupTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-07-15T14:00:00Z',
        description: 'Latest acceptable pickup time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "latestPickupTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-07-15T16:00:00Z',
        description: 'Required delivery time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "requiredDeliveryTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: client_1.UrgencyLevel.HIGH,
        description: 'Urgency level of the booking'
    }),
    (0, class_validator_1.IsEnum)(client_1.UrgencyLevel),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "urgencyLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: LoadingType.FORKLIFT_REQUIRED,
        description: 'Loading method required'
    }),
    (0, class_validator_1.IsEnum)(LoadingType),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "loadingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: LoadingType.MANUAL_LOADING,
        description: 'Unloading method required'
    }),
    (0, class_validator_1.IsEnum)(LoadingType),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "unloadingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 150000,
        description: 'Your proposed price in Naira'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1000),
    (0, class_validator_1.Max)(10000000),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "proposedPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NGN',
        description: 'Currency code'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(3),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 120000,
        description: 'Minimum acceptable price'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "minimumPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 200000,
        description: 'Maximum acceptable price'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "maximumPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether price is negotiable'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateBookingDto.prototype, "isNegotiable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Need reliable carrier with good reviews',
        description: 'Additional requirements or notes'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "additionalRequirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['GPS_TRACKING', 'INSURANCE_COVERED'],
        description: 'Required services'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateBookingDto.prototype, "requiredServices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Contact person for this booking'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "contactPerson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+234-80-1234-5678',
        description: 'Contact phone number'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'contact@cocacola.com',
        description: 'Contact email'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "contactEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-07-18T23:59:59Z',
        description: 'Booking expiration time'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether to send notifications'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateBookingDto.prototype, "notificationsEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Whether this is a recurring booking'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateBookingDto.prototype, "isRecurring", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'weekly',
        description: 'Recurrence pattern (if recurring)'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "recurrencePattern", void 0);
//# sourceMappingURL=create-booking.dto.js.map