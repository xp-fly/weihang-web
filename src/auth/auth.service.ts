import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import {AuthLoginDto} from './dto/auth-login.dto';
import {JwtPayload} from './interface/jwt-payload.interface';
import * as jwt from 'jsonwebtoken';
import {JWT_SECRET, JWT_SECRET_EXPIRES_IN} from '../constant';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.findUserById(payload.id);
    }

    async createToken(loginDto: AuthLoginDto): Promise<string> {
        const user = await this.userService.findOneByName(loginDto.username);
        if (!user || (user.password !== loginDto.password)) {
            throw new UnauthorizedException('用户名或密码错误！');
        }
        const payload: JwtPayload = {
            id: user.id,
            username: user.username,
        };
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_SECRET_EXPIRES_IN,
        });
    }
}
