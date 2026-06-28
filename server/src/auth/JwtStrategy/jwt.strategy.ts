import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '43f793ef20f92223a4cf483e36e80aa71b45dccae4b1612060f78a0af59a3300',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}