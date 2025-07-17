import {
  IsEmail,
  IsStrongPassword,
  MinLength,
  MaxLength,
  IsString,
  IsOptional,
  Matches,
  IsPhoneNumber,
  IsEnum,
  IsUrl,
  ValidateNested,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum CompanyType {
  SHIPPER = 'SHIPPER',
  CARRIER = 'CARRIER',
  BOTH = 'BOTH',
}

export enum CompanySize {
  SMALL = 'SMALL', // 1-10 employees
  MEDIUM = 'MEDIUM', // 11-50 employees
  LARGE = 'LARGE', // 51-200 employees
  ENTERPRISE = 'ENTERPRISE', // 200+ employees
}

export class AddressDto {
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
}

export class CreateCompanyDto {
  /** User Type */
  @IsEnum(CompanyType, { message: 'User type must be shipper or carrier' })
  userType: CompanyType;

  /** User Email */
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  /** @example "Kahuna Logistics Ltd" */
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  companyName: string;

  /** @example "KL-2024-001" */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[A-Z0-9-]+$/, {
    message:
      'Registration number must contain only uppercase letters, numbers, and hyphens',
  })
  registrationNumber?: string;

  /** @example "12345678901" */
  @IsOptional()
  @IsString()
  @MinLength(9)
  @MaxLength(15)
  @Matches(/^[0-9]+$/, { message: 'Tax ID must contain only numbers' })
  taxId?: string;

  /** Company physical address */
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  /** @example "contact@kahuna-logistics.com" */
  @IsEmail({}, { message: 'Please provide a valid business email address' })
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  businessEmail: string;

  /** @example "+234-80-1234-5678" */
  @IsPhoneNumber('NG', {
    message: 'Please provide a valid Nigerian phone number',
  })
  phoneNumber: string;

  /** @example "https://www.kahuna-logistics.com" */
  @IsOptional()
  @IsUrl({}, { message: 'Please provide a valid website URL' })
  @MaxLength(200)
  website?: string;

  /** @example "shipper" */
  @IsEnum(CompanyType, {
    message: 'Company type must be either shipper, carrier, or both',
  })
  companyType: CompanyType;

  /** @example "medium" */
  @IsEnum(CompanySize, {
    message: 'Company size must be small, medium, large, or enterprise',
  })
  companySize: CompanySize;

  /** @example "We specialize in beverage distribution across West Africa" */
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  @Transform(({ value }) => value?.trim())
  description?: string;

  /** Primary contact person's first name */
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

  /** Primary contact person's last name */
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

  /** Primary contact person's job title */
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  contactJobTitle: string;

  /** Primary contact person's phone number */
  @IsPhoneNumber('NG', {
    message:
      'Please provide a valid Nigerian phone number for the contact person',
  })
  contactPhone: string;

  /** Primary contact person's email */
  @IsEmail(
    {},
    { message: 'Please provide a valid email address for the contact person' },
  )
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  contactEmail: string;

  /** Account password */
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
      minLowercase: 1,
    },
    {
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  @MaxLength(128)
  password: string;

  /** Terms and conditions acceptance */
  @IsNotEmpty()
  @Matches(/^true$/, { message: 'You must accept the terms and conditions' })
  @Transform(({ value }) =>
    value === true || value === 'true' ? 'true' : 'false',
  )
  acceptTerms: string;

  /** Privacy policy acceptance */
  @IsNotEmpty()
  @Matches(/^true$/, { message: 'You must accept the privacy policy' })
  @Transform(({ value }) =>
    value === true || value === 'true' ? 'true' : 'false',
  )
  acceptPrivacy: string;

  /** Marketing communications opt-in */
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  marketingOptIn?: boolean;

  /** Expected monthly shipment volume (for shippers) */
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  expectedMonthlyVolume?: string;

  /** Fleet size (for carriers) */
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  fleetSize?: string;

  /** Operating regions */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  operatingRegions?: string;
}
