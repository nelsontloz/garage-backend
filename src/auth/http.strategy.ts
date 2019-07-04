import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as moment from 'moment';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(accessToken: string) {
    const session = await this.authService.getSession(accessToken);
    if (!session) {
      throw new UnauthorizedException();
    }
    if (session.revoked) {
      throw new UnauthorizedException('Session revoked');
    }
    const currentDate = moment();
    if (currentDate > moment(session.expiration)) {
      throw new UnauthorizedException('Session expired');
    }
    return session;
  }
}
