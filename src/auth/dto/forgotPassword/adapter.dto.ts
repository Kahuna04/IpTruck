export class ForgotPasswordRO {
  status: number;
  message: string;
  data: string;

  constructor(init?: Partial<ForgotPasswordRO>) {
    Object.assign(this, init);
  }
}

import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class PasswordResetRequestAdapter {
  @Expose()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Expose()
  @Transform(({ value }) => value || 'email')
  resetMethod: string;

  @Expose()
  ipAddress: string;

  @Expose()
  userAgent: string;

  @Expose()
  deviceId: string;

  @Expose()
  @Transform(({ value }) => new Date())
  requestedAt: Date;

  @Expose()
  @Transform(({ value }) => new Date(Date.now() + 30 * 60 * 1000)) // 30 minutes
  expiresAt: Date;

  @Expose()
  @Transform(({ value }) => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  token: string;

  @Expose()
  @Transform(({ value }) => 'pending')
  status: string;

  constructor(partial: Partial<PasswordResetRequestAdapter>) {
    Object.assign(this, partial);
  }
}

export class EmailNotificationAdapter {
  @Expose()
  @Transform(({ value }) => value?.toLowerCase().trim())
  recipientEmail: string;

  @Expose()
  companyName: string;

  @Expose()
  contactFirstName: string;

  @Expose()
  contactLastName: string;

  @Expose()
  resetToken: string;

  @Expose()
  @Transform(({ value }) => `${process.env.FRONTEND_URL}/reset-password?token=${value}`)
  resetUrl: string;

  @Expose()
  @Transform(({ value }) => new Date(Date.now() + 30 * 60 * 1000).toLocaleString())
  expiryTime: string;

  @Expose()
  @Transform(({ value }) => 'password_reset')
  templateType: string;

  @Expose()
  @Transform(({ value }) => 'high')
  priority: string;

  constructor(partial: Partial<EmailNotificationAdapter>) {
    Object.assign(this, partial);
  }
}

export class SMSNotificationAdapter {
  @Expose()
  @Transform(({ value }) => value?.replace(/\D/g, '').replace(/^0/, '234'))
  recipientPhone: string;

  @Expose()
  companyName: string;

  @Expose()
  contactFirstName: string;

  @Expose()
  resetToken: string;

  @Expose()
  @Transform(({ value }) => `Your password reset code: ${value}. Valid for 30 minutes. If you didn't request this, please ignore.`)
  message: string;

  @Expose()
  @Transform(({ value }) => 'LogiTruck')
  senderId: string;

  @Expose()
  @Transform(({ value }) => 'password_reset')
  messageType: string;

  constructor(partial: Partial<SMSNotificationAdapter>) {
    Object.assign(this, partial);
  }
}

export class SecurityAuditAdapter {
  @Expose()
  userId: string;

  @Expose()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Expose()
  ipAddress: string;

  @Expose()
  userAgent: string;

  @Expose()
  deviceId: string;

  @Expose()
  action: string; // 'password_reset_requested', 'password_reset_completed', 'token_verified', etc.

  @Expose()
  success: boolean;

  @Expose()
  failureReason?: string;

  @Expose()
  @Transform(({ value }) => new Date())
  timestamp: Date;

  @Expose()
  @Transform(({ value }) => value || 'web')
  platform: string;

  @Expose()
  additionalData?: Record<string, any>;

  constructor(partial: Partial<SecurityAuditAdapter>) {
    Object.assign(this, partial);
  }
}

export class PasswordResetCompleteAdapter {
  @Expose()
  userId: string;

  @Expose()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Expose()
  @Transform(({ value }) => new Date())
  passwordChangedAt: Date;

  @Expose()
  @Transform(({ value }) => new Date())
  lastLoginAt: Date;

  @Expose()
  @Transform(({ value }) => 'active')
  accountStatus: string;

  @Expose()
  @Transform(({ value }) => true)
  forceRelogin: boolean;

  @Expose()
  ipAddress: string;

  @Expose()
  userAgent: string;

  @Expose()
  deviceId: string;

  // Security: Exclude sensitive fields
  @Exclude()
  newPassword: string;

  @Exclude()
  oldPasswordHash: string;

  @Exclude()
  resetToken: string;

  constructor(partial: Partial<PasswordResetCompleteAdapter>) {
    Object.assign(this, partial);
  }
}

export class TokenValidationAdapter {
  @Expose()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Expose()
  token: string;

  @Expose()
  @Transform(({ value }) => new Date())
  validatedAt: Date;

  @Expose()
  isValid: boolean;

  @Expose()
  @Transform(({ value }) => new Date(value))
  expiresAt: Date;

  @Expose()
  @Transform(({ value }) => Math.max(0, Math.floor((new Date(value).getTime() - new Date().getTime()) / 1000)))
  secondsUntilExpiry: number;

  @Expose()
  ipAddress: string;

  @Expose()
  userAgent: string;

  @Expose()
  attemptCount: number;

  constructor(partial: Partial<TokenValidationAdapter>) {
    Object.assign(this, partial);
  }
}