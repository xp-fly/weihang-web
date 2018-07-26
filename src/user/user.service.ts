import { Injectable } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from './entity/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    /**
     * 新增用户
     * @param {CreateUserDto} userDto
     * @return {Promise<UserEntity>}
     */
    async add(userDto: CreateUserDto) {
        const user = this.userRepository.create();
        user.username = userDto.username;
        user.password = userDto.password;
        return await this.userRepository.save(user);
    }

    async findOneByToken(token: string) {
        if (token === null || token === '') {
            return await null;
        }
        return '';
    }

    list() {
        return this.userRepository.findAndCount();
    }
}
