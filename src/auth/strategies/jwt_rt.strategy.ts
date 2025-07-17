import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../../shared/constants';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<string>('JWT_RT_SECRET') || 'fallback_rt_secret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, data: JwtPayload) {
    const authHeader = req.get('authorization');
    const refreshToken = authHeader
      ? authHeader.replace('Bearer', '').trim()
      : '';
    const { email, sub } = data;
    return { payload: { sub, email }, refreshToken };
  }
}
