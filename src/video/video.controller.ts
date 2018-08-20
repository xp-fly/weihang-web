import {
    Body,
    Controller, Delete, FileInterceptor, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards,
} from '@nestjs/common';
import {VideoService} from './video.service';
import {AuthGuard} from '@nestjs/passport';
import {VideoEntity} from './entity/video.entity';
import {ApiUseTags} from '@nestjs/swagger';
import {CreateVideoDto} from './dto/create-video.dto';

@ApiUseTags('video')
@UseGuards(AuthGuard('jwt'))
@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

    /**
     * 视频列表
     * @param query
     * @returns {Promise<any>}
     */
    @Get()
    async list(@Query() query: any): Promise<any> {
        return await this.videoService.list(query);
    }

    /**
     * 上传视频
     * @param crateDto
     * @returns {Promise<any>}
     */
    @Post()
    async add(
        @Body() crateDto: CreateVideoDto,
    ): Promise<any> {
        return await this.videoService.add(crateDto);
    }

    /**
     * 删除视频
     * @param {number} id
     * @returns {Promise<any>}
     */
    @Delete(':id')
    async remove(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<any> {
        return await this.videoService.remove(id);
    }

    @Put(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() video: VideoEntity,
    ): Promise<any> {
        return await this.videoService.edit(id, video);
    }
}
