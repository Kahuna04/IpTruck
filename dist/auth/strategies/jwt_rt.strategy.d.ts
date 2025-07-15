import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../../shared/constants';
declare const RtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class RtStrategy extends RtStrategy_base {
    constructor(configService: ConfigService);
    validate(req: Request, data: JwtPayload): Promise<{
        payload: {
            sub: string;
            email: string;
        };
        refreshToken: string;
    }>;
}
export {};
