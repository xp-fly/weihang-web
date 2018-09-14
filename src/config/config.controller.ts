import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ConfigEntity} from './entity/config.entity';
import {CreateConfigDto} from './dto/create-config.dto';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags} from '@nestjs/swagger';
import {ConfigService} from './config.service';

@ApiUseTags('config')
@UseGuards(AuthGuard('jwt'))
@Controller('config')
export class ConfigController {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    @Get()
    async list(@Query() query: object): Promise<any> {
        const [list, count] = await this.configService.list(query);
        return {
            count,
            list,
        };
    }

    @Post()
    async add(@Body() tagDto: CreateConfigDto): Promise<ConfigEntity> {
        return await this.configService.add(tagDto);
    }

    @Put(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() tag: CreateConfigDto,
    ): Promise<any> {
        return await this.configService.edit(id, tag);
    }

    @Delete(':id')
    async remove(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<any> {
        return await this.configService.remove(id);
    }
}
