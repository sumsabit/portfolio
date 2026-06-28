import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (password !== adminPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: 1, email: 'admin@portfolio.com' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}