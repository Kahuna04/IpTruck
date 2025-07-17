import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../../shared/constants';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService, configService: ConfigService);
    validate(payload: JwtPayload): Promise<{
        email: string;
        password: string;
        userType: import(".prisma/client").$Enums.UserType;
        refreshToken: string | null;
        lat: number | null;
        lng: number | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        isVerified: boolean;
        resetPasswordToken: string | null;
    }>;
}
export {};
