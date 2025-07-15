import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from '../shared/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHandler {
  private readonly logger: Logger;
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    this.logger = new Logger(JwtHandler.name);
    this.SECRET = this.config.get<string>('JWT_AT_SECRET') || 'fallback_secret';
    this.RT_SECRET = this.config.get<string>('JWT_RT_SECRET') || 'fallback_rt_secret';
    this.TOKEN_EXPIRATION = this.config.get<string>('TOKEN_EXPIRATION') || '15m';
    this.RT_EXPIRATION = this.config.get<string>('REFRESH_TOKEN_EXPIRATION') || '7d';
  }

  private SECRET: string;
  private RT_SECRET: string;
  private TOKEN_EXPIRATION: string;
  private RT_EXPIRATION: string;

  async generateTokens(payload: JwtPayload): Promise<Tokens> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: this.SECRET,
          expiresIn: this.TOKEN_EXPIRATION,
        }),
        this.jwtService.signAsync(payload, {
          secret: this.RT_SECRET,
          expiresIn: this.RT_EXPIRATION,
        }),
      ]);
      console.log(`Generated Access Token: ${accessToken}`);
      console.log(`Generated Refresh Token: ${refreshToken}`);
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw new InternalServerErrorException('Failed to generate tokens');
    }
  }

  async generateResetToken(email: string): Promise<string> {
    try {
      const resetToken = await this.jwtService.signAsync(
        { email },
        {
          secret: this.SECRET,
          expiresIn: this.TOKEN_EXPIRATION,
        },
      );
      return resetToken;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw new InternalServerErrorException('Failed to generate reset token');
    }
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, { secret: this.SECRET });
    } catch (error) {
      this.logger.log('error occurred verifying token', error.message);
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException('Token has expired');
      } else {
        throw new BadRequestException('Invalid Token');
      }
    }
  }
}
