import { BearerStrategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(BearerStrategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(token: any, done: (any, boolean) => void) {
        const user = await this.authService.validateUser(token);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}
