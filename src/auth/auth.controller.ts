import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async authenticate(@Body() auth: any) {
        return this.authService.authenticate(auth.email, auth.password);
    }
}
