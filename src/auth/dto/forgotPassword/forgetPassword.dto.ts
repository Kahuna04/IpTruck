import { 
  IsEmail, 
  IsString, 
  MinLength, 
  MaxLength, 
  IsOptional, 
  IsUUID,
  IsStrongPassword,
  Matches,
  IsIP,
  IsEnum
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum ResetMethod {
  EMAIL = 'email',
  SMS = 'sms',
  BOTH = 'both'
}

export class ForgotPasswordDto {
  /** @example "contact@kahuna-logistics.com" */
  @ApiProperty({
    example: 'contact@kahuna-logistics.com',
    description: 'Company email address for password reset'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  /** @example "email" */
  @ApiProperty({
    example: 'email',
    description: 'Preferred method for receiving reset instructions',
    enum: ResetMethod,
    required: false
  })
  @IsOptional()
  @IsEnum(ResetMethod, { message: 'Reset method must be email, sms, or both' })
  resetMethod?: ResetMethod;

  /** @example "192.168.1.100" */
  @ApiProperty({
    example: '192.168.1.100',
    description: 'Client IP address for security logging',
    required: false
  })
  @IsOptional()
  @IsIP()
  ipAddress?: string;

  /** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" */
  @ApiProperty({
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    description: 'Client user agent for security logging',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string;

  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Device fingerprint for security',
    required: false
  })
  @IsOptional()
  @IsUUID()
  deviceId?: string;
}

export class VerifyResetTokenDto {
  /** @example "contact@kahuna-logistics.com" */
  @ApiProperty({
    example: 'contact@kahuna-logistics.com',
    description: 'Company email address'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  /** @example "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz" */
  @ApiProperty({
    example: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
    description: 'Password reset token from email/SMS'
  })
  @IsString()
  @MinLength(32, { message: 'Reset token must be at least 32 characters' })
  @MaxLength(128, { message: 'Reset token must not exceed 128 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Reset token must contain only alphanumeric characters' })
  token: string;

  /** @example "192.168.1.100" */
  @ApiProperty({
    example: '192.168.1.100',
    description: 'Client IP address for security verification',
    required: false
  })
  @IsOptional()
  @IsIP()
  ipAddress?: string;
}

export class ResetPasswordDto {
  /** @example "contact@kahuna-logistics.com" */
  @ApiProperty({
    example: 'contact@kahuna-logistics.com',
    description: 'Company email address'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  /** @example "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz" */
  @ApiProperty({
    example: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
    description: 'Password reset token from email/SMS'
  })
  @IsString()
  @MinLength(32, { message: 'Reset token must be at least 32 characters' })
  @MaxLength(128, { message: 'Reset token must not exceed 128 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Reset token must contain only alphanumeric characters' })
  token: string;

  /** @example "NewPassword@123" */
  @ApiProperty({
    example: 'NewPassword@123',
    description: 'New password for the account'
  })
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
  newPassword: string;

  /** @example "NewPassword@123" */
  @ApiProperty({
    example: 'NewPassword@123',
    description: 'Confirm new password'
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  confirmPassword: string;

  /** @example "192.168.1.100" */
  @ApiProperty({
    example: '192.168.1.100',
    description: 'Client IP address for security logging',
    required: false
  })
  @IsOptional()
  @IsIP()
  ipAddress?: string;

  /** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" */
  @ApiProperty({
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    description: 'Client user agent for security logging',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string;

  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Device fingerprint for security',
    required: false
  })
  @IsOptional()
  @IsUUID()
  deviceId?: string;
}

export class ResendResetTokenDto {
  /** @example "contact@kahuna-logistics.com" */
  @ApiProperty({
    example: 'contact@kahuna-logistics.com',
    description: 'Company email address'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100)
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  /** @example "email" */
  @ApiProperty({
    example: 'email',
    description: 'Preferred method for receiving reset instructions',
    enum: ResetMethod,
    required: false
  })
  @IsOptional()
  @IsEnum(ResetMethod, { message: 'Reset method must be email, sms, or both' })
  resetMethod?: ResetMethod;

  /** @example "192.168.1.100" */
  @ApiProperty({
    example: '192.168.1.100',
    description: 'Client IP address for security logging',
    required: false
  })
  @IsOptional()
  @IsIP()
  ipAddress?: string;
}