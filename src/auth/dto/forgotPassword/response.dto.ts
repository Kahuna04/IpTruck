import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ForgetPasswordResponse {
    @ApiProperty({ example: true })
    @Expose()
    success: boolean;
  
    @ApiProperty({ example: 'Password reset instructions sent successfully' })
    @Expose()
    message: string;
  
    @ApiProperty({ example: 'c***l@kahuna-logistics.com' })
    @Expose()
    @Transform(({ value }) => {
      const [local, domain] = value.split('@');
      const maskedLocal = local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);
      return `${maskedLocal}@${domain}`;
    })
    maskedEmail: string;
  
    @ApiProperty({ example: '***-***-5678' })
    @Expose()
    maskedPhone?: string;
  
    @ApiProperty({ example: 'email' })
    @Expose()
    deliveryMethod: string;
  
    @ApiProperty({ example: 1800 })
    @Expose()
    expiresIn: number;
  
    @ApiProperty({ example: '2024-07-14T10:30:00Z' })
    @Expose()
    @Transform(({ value }) => new Date().toISOString())
    sentAt: string;
  
    @ApiProperty({ example: 'PWD_RESET_001' })
    @Expose()
    referenceId: string;
  
    constructor(partial: Partial<ForgetPasswordResponse>) {
      Object.assign(this, partial);
    }
  }
  
  export class VerifyTokenResponse {
    @ApiProperty({ example: true })
    @Expose()
    success: boolean;
  
    @ApiProperty({ example: 'Reset token is valid' })
    @Expose()
    message: string;
  
    @ApiProperty({ example: true })
    @Expose()
    isValid: boolean;
  
    @ApiProperty({ example: 'contact@kahuna-logistics.com' })
    @Expose()
    @Transform(({ value }) => {
      const [local, domain] = value.split('@');
      const maskedLocal = local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);
      return `${maskedLocal}@${domain}`;
    })
    maskedEmail: string;
  
    @ApiProperty({ example: 1200 })
    @Expose()
    expiresIn: number;
  
    @ApiProperty({ example: '2024-07-14T11:00:00Z' })
    @Expose()
    @Transform(({ value }) => value?.toISOString())
    expiresAt: string;
  
    constructor(partial: Partial<VerifyTokenResponse>) {
      Object.assign(this, partial);
    }
  }
  
  export class ResetPasswordResponse {
    @ApiProperty({ example: true })
    @Expose()
    success: boolean;
  
    @ApiProperty({ example: 'Password reset successfully' })
    @Expose()
    message: string;
  
    @ApiProperty({ example: 'contact@kahuna-logistics.com' })
    @Expose()
    @Transform(({ value }) => {
      const [local, domain] = value.split('@');
      const maskedLocal = local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);
      return `${maskedLocal}@${domain}`;
    })
    maskedEmail: string;
  
    @ApiProperty({ example: '2024-07-14T10:30:00Z' })
    @Expose()
    @Transform(({ value }) => new Date().toISOString())
    resetCompletedAt: string;
  
    @ApiProperty({ example: true })
    @Expose()
    requiresRelogin: boolean;
  
    @ApiProperty({ example: 'Your password has been updated. Please log in with your new password.' })
    @Expose()
    nextSteps: string;
  
    constructor(partial: Partial<ResetPasswordResponse>) {
      Object.assign(this, partial);
    }
  }
  
  export class PasswordResetErrorResponse {
    @ApiProperty({ example: false })
    @Expose()
    success: boolean;
  
    @ApiProperty({ example: 'Invalid or expired reset token' })
    @Expose()
    message: string;
  
    @ApiProperty({ example: 'TOKEN_EXPIRED' })
    @Expose()
    errorCode: string;
  
    @ApiProperty({ example: 'PWD_ERR_001' })
    @Expose()
    errorId: string;
  
    @ApiProperty({ example: 2 })
    @Expose()
    attemptsRemaining?: number;
  
    @ApiProperty({ example: 'Request a new password reset link' })
    @Expose()
    suggestedAction?: string;
  
    @ApiProperty({ example: '2024-07-14T10:30:00Z' })
    @Expose()
    @Transform(({ value }) => new Date().toISOString())
    timestamp: string;
  
    constructor(partial: Partial<PasswordResetErrorResponse>) {
      Object.assign(this, partial);
    }
  }
  
  export class ResendTokenResponse {
    @ApiProperty({ example: true })
    @Expose()
    success: boolean;
  
    @ApiProperty({ example: 'New password reset instructions sent' })
    @Expose()
    message: string;
  
    @ApiProperty({ example: 'c***l@kahuna-logistics.com' })
    @Expose()
    @Transform(({ value }) => {
      const [local, domain] = value.split('@');
      const maskedLocal = local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);
      return `${maskedLocal}@${domain}`;
    })
    maskedEmail: string;
  
    @ApiProperty({ example: 1800 })
    @Expose()
    expiresIn: number;
  
    @ApiProperty({ example: 900 })
    @Expose()
    cooldownPeriod: number;
  
    @ApiProperty({ example: '2024-07-14T10:30:00Z' })
    @Expose()
    @Transform(({ value }) => new Date().toISOString())
    sentAt: string;
  
    constructor(partial: Partial<ResendTokenResponse>) {
      Object.assign(this, partial);
    }
  }
