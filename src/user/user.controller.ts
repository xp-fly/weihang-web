import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('user')
    add(@Body() user: CreateUserDto) {
        return this.userService.add(user);
    }

    @Get('user')
    @UseGuards(AuthGuard('bearer'))
    list() {
        return this.userService.list();
    }
}
