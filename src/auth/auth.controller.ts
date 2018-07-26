import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthLoginDto} from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('token')
    async createToken(@Body() loginDto: AuthLoginDto): Promise<any> {
        return await this.authService.createToken(loginDto);
    }
}
