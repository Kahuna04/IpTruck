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
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BidStatus } from '@prisma/client';

export { BidStatus };
export { UpdateBidDto } from './update-bid.dto';

export enum TruckCondition {
  NEW = 'new',
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor'
}

export class TruckDetailsDto {
  [key: string]: any;
  
  @ApiProperty({
    example: 'Mercedes-Benz Actros',
    description: 'Truck make and model'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  makeModel: string;

  @ApiProperty({
    example: 2020,
    description: 'Year of manufacture'
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1990)
  @Max(2030)
  year: number;

  @ApiProperty({
    example: 'ABC123DE',
    description: 'License plate number'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  licensePlate: string;

  @ApiProperty({
    example: 25000,
    description: 'Maximum payload capacity in kg'
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(50000)
  maxPayload: number;

  @ApiProperty({
    example: 85,
    description: 'Cargo volume capacity in cubic meters'
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(200)
  cargoVolume?: number;

  @ApiProperty({
    example: TruckCondition.GOOD,
    description: 'Overall condition of the truck'
  })
  @IsEnum(TruckCondition)
  condition: TruckCondition;

  @ApiProperty({
    example: 150000,
    description: 'Odometer reading in kilometers'
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  mileage?: number;

  @ApiProperty({
    example: 'GPS tracking, temperature monitoring',
    description: 'Available equipment and features'
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  equipment?: string;

  @ApiProperty({
    example: ['GPS_TRACKING', 'TEMPERATURE_CONTROL', 'LOADING_ASSISTANCE'],
    description: 'Available services'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  availableServices?: string[];

  @ApiProperty({
    example: 'https://example.com/truck-photo.jpg',
    description: 'URL to truck photo'
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  photoUrl?: string;

  @ApiProperty({
    example: 'INS12345',
    description: 'Insurance policy number'
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  insuranceNumber?: string;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Insurance expiry date'
  })
  @IsOptional()
  @IsDateString()
  insuranceExpiryDate?: string;
}

export class DriverDetailsDto {
  [key: string]: any;
  
  @ApiProperty({
    example: 'John Smith',
    description: 'Driver full name'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    example: 'DL12345678',
    description: 'Driver license number'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  licenseNumber: string;

  @ApiProperty({
    example: '2025-06-30',
    description: 'License expiry date'
  })
  @IsNotEmpty()
  @IsDateString()
  licenseExpiryDate: string;

  @ApiProperty({
    example: 8,
    description: 'Years of driving experience'
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(50)
  experienceYears: number;

  @ApiProperty({
    example: '+234-80-9876-5432',
    description: 'Driver contact phone'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  contactPhone: string;

  @ApiProperty({
    example: 4.8,
    description: 'Driver rating out of 5'
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiProperty({
    example: 245,
    description: 'Number of completed trips'
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  completedTrips?: number;

  @ApiProperty({
    example: ['HAZMAT', 'REFRIGERATED_TRANSPORT'],
    description: 'Special certifications'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];
}

export class CreateBidDto {
  @ApiProperty({
    example: 'booking-uuid-123',
    description: 'Booking ID this bid is for'
  })
  @IsNotEmpty()
  @IsString()
  bookingId: string;

  @ApiProperty({
    example: 'carrier-uuid-123',
    description: 'Carrier ID making the bid'
  })
  @IsNotEmpty()
  @IsString()
  carrierId: string;

  @ApiProperty({
    example: 145000,
    description: 'Bid amount in Naira'
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1000)
  @Max(10000000)
  bidAmount: number;

  @ApiProperty({
    example: 'NGN',
    description: 'Currency code'
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  currency?: string = 'NGN';

  @ApiProperty({
    example: '2024-07-15T06:00:00Z',
    description: 'Proposed pickup time'
  })
  @IsNotEmpty()
  @IsDateString()
  proposedPickupTime: string;

  @ApiProperty({
    example: '2024-07-15T14:00:00Z',
    description: 'Estimated delivery time'
  })
  @IsNotEmpty()
  @IsDateString()
  estimatedDeliveryTime: string;

  @ApiProperty({
    description: 'Truck details for this bid'
  })
  @ValidateNested()
  @Type(() => TruckDetailsDto)
  truckDetails: TruckDetailsDto;

  @ApiProperty({
    description: 'Driver details for this bid'
  })
  @ValidateNested()
  @Type(() => DriverDetailsDto)
  driverDetails: DriverDetailsDto;

  @ApiProperty({
    example: 'Reliable service with 10 years experience. Fully insured.',
    description: 'Additional message or proposal details'
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;

  @ApiProperty({
    example: ['GPS_TRACKING', 'REAL_TIME_UPDATES', 'PHOTO_PROOF'],
    description: 'Services included in this bid'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includedServices?: string[];

  @ApiProperty({
    example: '2024-07-16T23:59:59Z',
    description: 'Bid expiration time'
  })
  @IsOptional()
  @IsDateString()
  bidExpiresAt?: string;

  @ApiProperty({
    example: true,
    description: 'Whether this bid is negotiable'
  })
  @IsOptional()
  @IsBoolean()
  isNegotiable?: boolean = true;

  @ApiProperty({
    example: 'Payment on delivery preferred',
    description: 'Payment terms and conditions'
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  paymentTerms?: string;

  @ApiProperty({
    example: 'Available for immediate pickup',
    description: 'Special terms or conditions'
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  specialTerms?: string;

  @ApiProperty({
    example: 130000,
    description: 'Minimum acceptable counter-offer'
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minimumAcceptablePrice?: number;

  @ApiProperty({
    example: 'https://example.com/company-docs.pdf',
    description: 'URL to additional documentation'
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  documentationUrl?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Contact person for this bid'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  contactPerson: string;

  @ApiProperty({
    example: '+234-80-1234-5678',
    description: 'Contact phone number'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  contactPhone: string;

  @ApiProperty({
    example: 'carrier@logistics.com',
    description: 'Contact email'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  contactEmail?: string;
}

// Response DTO for bid responses
export class BidResponseDto {
  @ApiProperty({
    example: BidStatus.ACCEPTED,
    description: 'Response status',
    enum: BidStatus
  })
  @IsEnum(BidStatus)
  status: BidStatus;

  @ApiProperty({
    example: 'We accept your bid terms',
    description: 'Response message'
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;

  @ApiProperty({
    example: 140000,
    description: 'Counter-offer amount if applicable'
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  counterOfferAmount?: number;
}
