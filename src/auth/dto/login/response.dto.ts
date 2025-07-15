import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class UserProfileResponse {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'contact@kahuna-logistics.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'Kahuna Logistics Ltd' })
  @Expose()
  companyName: string;

  @ApiProperty({ example: 'shipper' })
  @Expose()
  companyType: string;

  @ApiProperty({ example: 'John' })
  @Expose()
  contactFirstName: string;

  @ApiProperty({ example: 'Doe' })
  @Expose()
  contactLastName: string;

  @ApiProperty({ example: 'Fleet Manager' })
  @Expose()
  contactJobTitle: string;

  @ApiProperty({ example: true })
  @Expose()
  isVerified: boolean;

  @ApiProperty({ example: 'active' })
  @Expose()
  status: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  @Expose()
  @Transform(({ value }) => value?.toISOString())
  lastLoginAt: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: string;

  // Security: Exclude sensitive fields
  @Exclude()
  password: string;

  @Exclude()
  passwordResetToken: string;

  @Exclude()
  twoFactorSecret: string;

  constructor(partial: Partial<UserProfileResponse>) {
    Object.assign(this, partial);
  }
}

export class LoginResponse {
  @ApiProperty({ example: true })
  @Expose()
  success: boolean;

  @ApiProperty({ example: 'Login successful' })
  @Expose()
  message: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @Expose()
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @Expose()
  refreshToken: string;

  @ApiProperty({ example: 3600 })
  @Expose()
  expiresIn: number;

  @ApiProperty({ example: 'Bearer' })
  @Expose()
  tokenType: string;

  @ApiProperty({ type: UserProfileResponse })
  @Expose()
  @Type(() => UserProfileResponse)
  user: UserProfileResponse;

  @ApiProperty({ example: ['dashboard', 'shipments', 'fleet'] })
  @Expose()
  permissions: string[];

  constructor(partial: Partial<LoginResponse>) {
    Object.assign(this, partial);
  }
}

export class TwoFactorResponse {
  @ApiProperty({ example: true })
  @Expose()
  success: boolean;

  @ApiProperty({ example: 'Two-factor authentication required' })
  @Expose()
  message: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @Expose()
  sessionToken: string;

  @ApiProperty({ example: 'sms' })
  @Expose()
  method: string;

  @ApiProperty({ example: '***-***-5678' })
  @Expose()
  maskedContact: string;

  @ApiProperty({ example: 300 })
  @Expose()
  expiresIn: number;

  constructor(partial: Partial<TwoFactorResponse>) {
    Object.assign(this, partial);
  }
}

export class LoginErrorResponse {
  @ApiProperty({ example: false })
  @Expose()
  success: boolean;

  @ApiProperty({ example: 'Invalid credentials' })
  @Expose()
  message: string;

  @ApiProperty({ example: 'INVALID_CREDENTIALS' })
  @Expose()
  errorCode: string;

  @ApiProperty({ example: 'LOGIN_001' })
  @Expose()
  errorId: string;

  @ApiProperty({ example: 2 })
  @Expose()
  attemptsRemaining?: number;

  @ApiProperty({ example: 900 })
  @Expose()
  lockoutTimeRemaining?: number;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  @Expose()
  @Transform(({ value }) => value?.toISOString())
  timestamp: string;

  constructor(partial: Partial<LoginErrorResponse>) {
    Object.assign(this, partial);
  }
}

export class LogoutResponse {
  @ApiProperty({ example: true })
  @Expose()
  success: boolean;

  @ApiProperty({ example: 'Logged out successfully' })
  @Expose()
  message: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  @Expose()
  @Transform(({ value }) => new Date().toISOString())
  timestamp: string;

  constructor(partial: Partial<LogoutResponse>) {
    Object.assign(this, partial);
  }
}