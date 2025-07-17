import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsIP,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum LoginType {
  EMAIL = 'email',
  PHONE = 'phone',
}

export class LoginDto {
  /** @example "contact@kahuna-logistics.com" */
  @ApiProperty({
    example: 'contact@kahuna-logistics.com',
    description: 'Company email address',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  /** @example "Password@123" */
  @ApiProperty({
    example: 'Password@123',
    description: 'Account password',
    minLength: 1,
    maxLength: 128,
  })
  @IsString()
  @MinLength(1, { message: 'Password is required' })
  @MaxLength(128)
  password: string;

  /** @example true */
  @ApiProperty({
    example: false,
    description: 'Remember login session for extended period',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  rememberMe?: boolean;

  /** @example "192.168.1.100" */
  @ApiProperty({
    example: '192.168.1.100',
    description: 'Client IP address for security logging',
    required: false,
  })
  @IsOptional()
  @IsIP()
  ipAddress?: string;

  /** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" */
  @ApiProperty({
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    description: 'Client user agent for security logging',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string;

  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Device fingerprint for security',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  deviceId?: string;
}

export class TwoFactorLoginDto {
  /** @example "contact@kahuna-logistics.com" */
  @ApiProperty({
    example: 'contact@kahuna-logistics.com',
    description: 'Company email address',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  /** @example "123456" */
  @ApiProperty({
    example: '123456',
    description: '6-digit verification code',
    minLength: 6,
    maxLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Verification code must be 6 digits' })
  @MaxLength(6, { message: 'Verification code must be 6 digits' })
  verificationCode: string;

  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Session token from initial login',
  })
  @IsUUID()
  sessionToken: string;
}
