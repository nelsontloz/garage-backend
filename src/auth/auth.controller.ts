import {
  Controller,
  Post,
  Body,
  Put,
  Headers,
  Get,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { isString } from 'util';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async validateAccessToken(@Headers() headers) {
    let accessToken = headers.authorization;
    if (!accessToken) {
      throw new NotFoundException();
    }
    accessToken = accessToken.split(' ')[1];
    const session = await this.authService.getSession(accessToken);
    if (!session) {
      throw new NotFoundException();
    }
    return session;
  }

  @Post()
  async authenticate(@Body() auth: any) {
    return this.authService.authenticate(auth.email, auth.password);
  }

  @Put('logout')
  async logout(@Headers() headers) {
    let accessToken = headers.authorization;
    if (!accessToken) {
      throw new NotFoundException();
    }
    accessToken = accessToken.split(' ')[1];
    return this.authService.logout(accessToken).then((session: any) => {
      return { message: 'logged out!' };
    });
  }

  @Put('revoke')
  async revoke(@Body() body) {
    const sessionId = body.sessionId;
    if (!isString(sessionId)) {
      throw new BadRequestException();
    }
    return this.authService.revokeSession(sessionId).then((session: any) => {
      return { message: 'session revoked!' };
    });
  }
}
