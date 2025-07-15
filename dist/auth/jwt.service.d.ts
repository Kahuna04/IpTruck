import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from '../shared/constants';
import { JwtService } from '@nestjs/jwt';
export declare class JwtHandler {
    private readonly jwtService;
    private readonly config;
    private readonly logger;
    constructor(jwtService: JwtService, config: ConfigService);
    private SECRET;
    private RT_SECRET;
    private TOKEN_EXPIRATION;
    private RT_EXPIRATION;
    generateTokens(payload: JwtPayload): Promise<Tokens>;
    generateResetToken(email: string): Promise<string>;
    verifyToken(token: string): Promise<any>;
}
