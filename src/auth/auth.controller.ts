import {Controller, Get} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Get('token')
    async createToken(): Promise<any> {
        return 'access token';
    }

    @Get('oauth')
    async createOauthToken(): Promise<any> {
        return 'oauth token';
    }
}
