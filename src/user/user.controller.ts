import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {AuthGuard} from '@nestjs/passport';

@Controller('auth')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('user')
    add(@Body() user: CreateUserDto) {
        return this.userService.add(user);
    }

    @Get('user')
    list() {
        return this.userService.list();
    }
}
