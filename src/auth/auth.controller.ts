import {
  Controller,
  Post,
  Body,
  Put,
  Headers,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

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

  @Put('revoke')
  async revoke(@Headers() headers) {
    let accessToken = headers.authorization;
    if (!accessToken) {
      throw new NotFoundException();
    }
    accessToken = accessToken.split(' ')[1];
    return this.authService.revokeSession(accessToken).then((session: any) => {
      return { message: 'session revoked!' };
    });
  }
}
