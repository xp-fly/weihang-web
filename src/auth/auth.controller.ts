import {Body, Controller, Post, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthLoginDto} from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('token')
    async createToken(@Body() loginDto: AuthLoginDto, @Res() response): Promise<any> {
        const token = await this.authService.createToken(loginDto);
        response
            .cookie('token', token, {
                maxAge: 60 * 60 * 1000,
            })
            .json(token);
    }
}
