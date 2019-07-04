import { Controller, Post, Body, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Session } from 'inspector';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async authenticate(@Body() auth: any) {
        return this.authService.authenticate(auth.email, auth.password);
    }

    @Put('revoke')
    async revoke(@Body() revoke: any) {
        return this.authService.revokeSession(revoke.sessionId).then((session: any) => {
            return { message: 'session revoqued!' };
        });
    }
}
