import {
  IsEmail,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsEnum,
  IsUrl,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
  Length,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum CompanySize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  ENTERPRISE = 'ENTERPRISE',
}

export class CreateShipperDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  companyName: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[A-Z0-9-]+$/, {
    message:
      'Registration number must contain only uppercase letters, numbers, and hyphens',
  })
  registrationNumber?: string;

  @IsOptional()
  @IsString()
  @MinLength(9)
  @MaxLength(15)
  @Matches(/^[0-9]+$/, { message: 'Tax ID must contain only numbers' })
  taxId?: string;

  @IsEmail({}, { message: 'Please provide a valid business email address' })
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  businessEmail: string;

  @IsPhoneNumber('NG', {
    message: 'Please provide a valid Nigerian phone number',
  })
  phoneNumber: string;

  @IsOptional()
  @IsUrl({}, { message: 'Please provide a valid website URL' })
  @MaxLength(200)
  website?: string;

  @IsEnum(CompanySize, {
    message: 'Company size must be SMALL, MEDIUM, LARGE, or ENTERPRISE',
  })
  companySize: CompanySize;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  @Transform(({ value }) => value?.trim())
  description?: string;

  // Address fields
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  street: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  state: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 10)
  @Matches(/^[0-9]{5,10}$/, { message: 'Postal code must be 5-10 digits' })
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 3)
  @Matches(/^[A-Z]{2,3}$/, {
    message: 'Country code must be 2-3 uppercase letters',
  })
  countryCode: string;

  // Contact Person fields
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'First name must contain only letters, spaces, hyphens, and apostrophes',
  })
  @Transform(({ value }) => value?.trim())
  contactFirstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'Last name must contain only letters, spaces, hyphens, and apostrophes',
  })
  @Transform(({ value }) => value?.trim())
  contactLastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  contactJobTitle: string;

  @IsPhoneNumber('NG', {
    message:
      'Please provide a valid Nigerian phone number for the contact person',
  })
  contactPhone: string;

  @IsEmail(
    {},
    { message: 'Please provide a valid email address for the contact person' },
  )
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  contactEmail: string;

  // Business Info
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  expectedMonthlyVolume?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  operatingRegions?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  marketingOptIn?: boolean;
}
