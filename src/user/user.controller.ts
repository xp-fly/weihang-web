import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('auth')
@UseGuards(AuthGuard('jwt'))
@Controller('auth')
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
