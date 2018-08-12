import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {TagService} from './tag.service';
import {TagEntity} from './entity/tag.entity';
import {CreateTagDto} from './dto/create-tag.dto';

@Controller('tag')
export class TagController {
    constructor(
        private readonly tagService: TagService,
    ) {}

    @Get()
    async list(@Query() query: object): Promise<any> {
        return await this.tagService.list(query);
    }

    @Post()
    async add(@Body() tagDto: CreateTagDto): Promise<TagEntity> {
        return await this.tagService.add(tagDto);
    }

    @Put(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() tag: TagEntity,
    ): Promise<any> {
        return await this.tagService.edit(id, tag);
    }

    @Delete(':id')
    async remove(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<any> {
        return await this.tagService.remove(id);
    }

    @Get('/all')
    async fetchAll(
        @Query() query: object,
    ): Promise<TagEntity> {
        return await this.tagService.fetchAll(query);
    }
}
