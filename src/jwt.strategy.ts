import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtauthService } from './jwtauth.service';
//import { JwtPayload } from './jwt-payload.interface';
import { User } from './user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: JwtauthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'b801e52a-971d-42b5-8c60-99636dd974b9:hIpHVBedpyNkmlGtH4w3xuh/9L3t5yKVh4BfUFQF/5c=',
    });
  }

  async validate(user: User) {
    const validUser = await this.authService.validateUser(user);
    if (!validUser) {
      throw new UnauthorizedException();
    }
    return validUser;
  }
}