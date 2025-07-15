import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt_at.strategy';
import { RtStrategy } from './strategies/jwt_rt.strategy';
import { JwtHandler } from './jwt.service';
import { HelperService } from '../shared/helper.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ShipperModule } from '../shipper/shipper.module';
import { CarrierModule } from '../carrier/carrier.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    PrismaModule,
    ShipperModule,
    CarrierModule,
    EmailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_AT_SECRET') || 'default-secret',
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RtStrategy,
    HelperService,
    JwtHandler,
    JwtService,
  ],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
