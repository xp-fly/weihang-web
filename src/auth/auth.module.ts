import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from '../user/user.module';
import {AuthController} from './auth.controller';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
