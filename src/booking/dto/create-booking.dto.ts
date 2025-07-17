import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
  MinLength,
  MaxLength,
  IsPositive,
  Min,
  Max,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UrgencyLevel } from '@prisma/client';

export enum CargoType {
  BEVERAGES = 'beverages',
  FOOD_PRODUCTS = 'food_products',
  ELECTRONICS = 'electronics',
  TEXTILES = 'textiles',
  CONSTRUCTION_MATERIALS = 'construction_materials',
  AUTOMOTIVE_PARTS = 'automotive_parts',
  CHEMICALS = 'chemicals',
  PHARMACEUTICALS = 'pharmaceuticals',
  MACHINERY = 'machinery',
  GENERAL_CARGO = 'general_cargo',
  HAZARDOUS_MATERIALS = 'hazardous_materials',
  PERISHABLES = 'perishables',
  FRAGILE_ITEMS = 'fragile_items',
  BULK_CARGO = 'bulk_cargo',
  LIQUID_CARGO = 'liquid_cargo',
  OTHER = 'other',
}

export enum TruckType {
  FLATBED = 'flatbed',
  REFRIGERATED = 'refrigerated',
  DRY_VAN = 'dry_van',
  TANKER = 'tanker',
  CONTAINER = 'container',
  HEAVY_HAUL = 'heavy_haul',
  PICKUP = 'pickup',
  BOX_TRUCK = 'box_truck',
  DUMP_TRUCK = 'dump_truck',
  CEMENT_MIXER = 'cement_mixer',
  CRANE_TRUCK = 'crane_truck',
  LOWBOY = 'lowboy',
  STEP_DECK = 'step_deck',
  DOUBLE_DROP = 'double_drop',
  SIDE_LOADER = 'side_loader',
  CAR_CARRIER = 'car_carrier',
  LIVESTOCK = 'livestock',
  LOGGING = 'logging',
  GARBAGE = 'garbage',
  TOWING = 'towing',
}

export enum LoadingType {
  SELF_LOADING = 'self_loading',
  ASSISTED_LOADING = 'assisted_loading',
  CRANE_REQUIRED = 'crane_required',
  FORKLIFT_REQUIRED = 'forklift_required',
  MANUAL_LOADING = 'manual_loading',
}

export class LocationDto {
  [key: string]: any;

  @ApiProperty({
    example: 'Coca-Cola Bottling Plant',
    description: 'Name of the location (warehouse, factory, etc.)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  locationName?: string;

  @ApiProperty({
    example: '123 Industrial Avenue',
    description: 'Street address',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  address: string;

  @ApiProperty({
    example: 'Lagos',
    description: 'City',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @ApiProperty({
    example: 'Lagos State',
    description: 'State or province',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  state: string;

  @ApiProperty({
    example: '100001',
    description: 'Postal code',
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  postalCode?: string;

  @ApiProperty({
    example: 'NG',
    description: 'Country code',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(3)
  countryCode: string;

  @ApiProperty({
    example: 6.5244,
    description: 'Latitude coordinate',
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiProperty({
    example: 3.3792,
    description: 'Longitude coordinate',
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiProperty({
    example: 'Gate 3, loading dock B',
    description: 'Specific loading/unloading instructions',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  specialInstructions?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Contact person at this location',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  contactPerson?: string;

  @ApiProperty({
    example: '+234-80-1234-5678',
    description: 'Contact phone number',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  contactPhone?: string;
}

export class CargoDetailsDto {
  [key: string]: any;

  @ApiProperty({
    example: 'Coca-Cola bottles and cans',
    description: 'Description of the cargo',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @ApiProperty({
    example: CargoType.BEVERAGES,
    description: 'Type of cargo being transported',
  })
  @IsEnum(CargoType)
  type: CargoType;

  @ApiProperty({
    example: 15000,
    description: 'Weight in kilograms',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(50000) // Maximum 50 tons
  weight: number;

  @ApiProperty({
    example: 45,
    description: 'Volume in cubic meters',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(200)
  volume?: number;

  @ApiProperty({
    example: 5.5,
    description: 'Length in meters',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(20)
  length?: number;

  @ApiProperty({
    example: 2.5,
    description: 'Width in meters',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(5)
  width?: number;

  @ApiProperty({
    example: 3.0,
    description: 'Height in meters',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(4.5)
  height?: number;

  @ApiProperty({
    example: 1000,
    description: 'Number of packages/units',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiProperty({
    example: 'Cases',
    description: 'Unit of measurement (cases, pallets, boxes, etc.)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string;

  @ApiProperty({
    example: 50000,
    description: 'Declared value in Naira',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  declaredValue?: number;

  @ApiProperty({
    example: true,
    description: 'Whether cargo requires temperature control',
  })
  @IsOptional()
  @IsBoolean()
  requiresRefrigeration?: boolean;

  @ApiProperty({
    example: 4,
    description: 'Required temperature in Celsius (if refrigerated)',
  })
  @IsOptional()
  @IsNumber()
  @Min(-30)
  @Max(30)
  requiredTemperature?: number;

  @ApiProperty({
    example: true,
    description: 'Whether cargo is fragile',
  })
  @IsOptional()
  @IsBoolean()
  isFragile?: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether cargo is hazardous',
  })
  @IsOptional()
  @IsBoolean()
  isHazardous?: boolean;

  @ApiProperty({
    example: 'UN1234',
    description: 'UN number for hazardous materials',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  hazardousClass?: string;

  @ApiProperty({
    example: 'Keep upright, do not stack',
    description: 'Special handling instructions',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  specialHandling?: string;
}

export class CreateBookingDto {
  @ApiProperty({
    example: 'BEV-DEL-001',
    description: 'Your internal reference number',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  referenceNumber?: string;

  @ApiProperty({
    example: 'Coca-Cola distribution to retailers',
    description: 'Brief description of the transport job',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  @Transform(({ value }) => value?.trim())
  description: string;

  @ApiProperty({
    description: 'Pickup location details',
  })
  @ValidateNested()
  @Type(() => LocationDto)
  pickupLocation: LocationDto;

  @ApiProperty({
    description: 'Delivery location details',
  })
  @ValidateNested()
  @Type(() => LocationDto)
  deliveryLocation: LocationDto;

  @ApiProperty({
    description: 'Cargo details',
  })
  @ValidateNested()
  @Type(() => CargoDetailsDto)
  cargoDetails: CargoDetailsDto;

  @ApiProperty({
    example: TruckType.REFRIGERATED,
    description: 'Preferred truck type',
  })
  @IsEnum(TruckType)
  preferredTruckType: TruckType;

  @ApiProperty({
    example: '2024-07-15T08:00:00Z',
    description: 'Preferred pickup date and time',
  })
  @IsDateString()
  preferredPickupTime: string;

  @ApiProperty({
    example: '2024-07-15T14:00:00Z',
    description: 'Latest acceptable pickup time',
  })
  @IsOptional()
  @IsDateString()
  latestPickupTime?: string;

  @ApiProperty({
    example: '2024-07-15T16:00:00Z',
    description: 'Required delivery time',
  })
  @IsOptional()
  @IsDateString()
  requiredDeliveryTime?: string;

  @ApiProperty({
    example: UrgencyLevel.HIGH,
    description: 'Urgency level of the booking',
  })
  @IsEnum(UrgencyLevel)
  urgencyLevel: UrgencyLevel;

  @ApiProperty({
    example: LoadingType.FORKLIFT_REQUIRED,
    description: 'Loading method required',
  })
  @IsEnum(LoadingType)
  loadingType: LoadingType;

  @ApiProperty({
    example: LoadingType.MANUAL_LOADING,
    description: 'Unloading method required',
  })
  @IsEnum(LoadingType)
  unloadingType: LoadingType;

  @ApiProperty({
    example: 150000,
    description: 'Your proposed price in Naira',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1000) // Minimum 1,000 Naira
  @Max(10000000) // Maximum 10 million Naira
  proposedPrice: number;

  @ApiProperty({
    example: 'NGN',
    description: 'Currency code',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  currency?: string = 'NGN';

  @ApiProperty({
    example: 120000,
    description: 'Minimum acceptable price',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minimumPrice?: number;

  @ApiProperty({
    example: 200000,
    description: 'Maximum acceptable price',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maximumPrice?: number;

  @ApiProperty({
    example: true,
    description: 'Whether price is negotiable',
  })
  @IsOptional()
  @IsBoolean()
  isNegotiable?: boolean = true;

  @ApiProperty({
    example: 'Need reliable carrier with good reviews',
    description: 'Additional requirements or notes',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  additionalRequirements?: string;

  @ApiProperty({
    example: ['GPS_TRACKING', 'INSURANCE_COVERED'],
    description: 'Required services',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requiredServices?: string[];

  @ApiProperty({
    example: 'John Doe',
    description: 'Contact person for this booking',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  contactPerson: string;

  @ApiProperty({
    example: '+234-80-1234-5678',
    description: 'Contact phone number',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  contactPhone: string;

  @ApiProperty({
    example: 'contact@cocacola.com',
    description: 'Contact email',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  contactEmail?: string;

  @ApiProperty({
    example: '2024-07-18T23:59:59Z',
    description: 'Booking expiration time',
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({
    example: true,
    description: 'Whether to send notifications',
  })
  @IsOptional()
  @IsBoolean()
  notificationsEnabled?: boolean = true;

  @ApiProperty({
    example: false,
    description: 'Whether this is a recurring booking',
  })
  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean = false;

  @ApiProperty({
    example: 'weekly',
    description: 'Recurrence pattern (if recurring)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  recurrencePattern?: string;
}
