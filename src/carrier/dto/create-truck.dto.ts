import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsArray,
  IsInt,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TRUCK_TYPES } from '../../shared/constants';

export class CreateTruckDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  makeModel: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(/^[A-Z0-9-]+$/, {
    message:
      'License plate must contain only uppercase letters, numbers, and hyphens',
  })
  @Transform(({ value }) => value?.toUpperCase().trim())
  licensePlate: string;

  @IsNumber()
  @Min(0.1)
  @Max(100) // Maximum 100 tons
  maxPayload: number;

  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @Max(1000) // Maximum 1000 cubic meters
  cargoVolume?: number;

  @IsEnum(TRUCK_TYPES, { message: 'Invalid truck type' })
  truckType: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  condition: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2000000) // Maximum 2 million km
  mileage?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(100, { each: true })
  equipment?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(100, { each: true })
  availableServices?: string[];

  @IsOptional()
  @IsUrl({}, { message: 'Please provide a valid photo URL' })
  @MaxLength(500)
  photoUrl?: string;

  // Insurance fields
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  insuranceNumber?: string;

  @IsOptional()
  @IsDateString()
  insuranceExpiryDate?: string;

  // Driver fields
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'Driver name must contain only letters, spaces, hyphens, and apostrophes',
  })
  @Transform(({ value }) => value?.trim())
  driverName?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  driverLicenseNumber?: string;

  @IsOptional()
  @IsDateString()
  driverLicenseExpiry?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  driverExperience?: number;

  @IsOptional()
  @IsPhoneNumber('NG', {
    message: 'Please provide a valid Nigerian phone number for the driver',
  })
  driverPhone?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  driverRating?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  isActive?: boolean;
}
