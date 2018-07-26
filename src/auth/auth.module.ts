import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from '../user/user.module';
import {AuthController} from './auth.controller';
import {HttpStrategy} from './http.strategy';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, HttpStrategy],
})
export class AuthModule {}
