export class UserRO {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };

  constructor(init?: Partial<UserRO>) {
    Object.assign(this, init);
  }
}

import { Expose, Transform } from 'class-transformer';

export class LoginRequestAdapter {
  @Expose()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Expose()
  password: string;

  @Expose()
  @Transform(({ value }) => Boolean(value))
  rememberMe: boolean;

  @Expose()
  ipAddress: string;

  @Expose()
  userAgent: string;

  @Expose()
  deviceId: string;

  @Expose()
  @Transform(({ value }) => new Date())
  loginAttemptTime: Date;

  constructor(partial: Partial<LoginRequestAdapter>) {
    Object.assign(this, partial);
  }
}

export class ExternalAuthAdapter {
  @Expose()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Expose()
  @Transform(({ value }) => `EXT_${value}`)
  externalId: string;

  @Expose()
  provider: 'google' | 'microsoft' | 'apple';

  @Expose()
  @Transform(({ value }) => new Date(value))
  tokenExpiry: Date;

  @Expose()
  @Transform(({ value }) => JSON.parse(value))
  providerData: Record<string, any>;

  constructor(partial: Partial<ExternalAuthAdapter>) {
    Object.assign(this, partial);
  }
}

export class SecurityLogAdapter {
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
  success: boolean;

  @Expose()
  failureReason?: string;

  @Expose()
  @Transform(({ value }) => new Date())
  timestamp: Date;

  @Expose()
  @Transform(({ value }) => value || 'web')
  platform: string;

  constructor(partial: Partial<SecurityLogAdapter>) {
    Object.assign(this, partial);
  }
}
