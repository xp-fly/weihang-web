import {Controller, Delete, FileInterceptor, Get, Param, ParseIntPipe, Post, Query, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {VideoService} from './video.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('video')
@UseGuards(AuthGuard('jwt'))
export class VideoController {
    constructor(private readonly videoService: VideoService) {}
    @Get()
    async list(@Query() query: any): Promise<any> {
        return await this.videoService.list(query);
    }
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async add(@UploadedFile() file): Promise<any> {
        return await this.videoService.add(file);
    }
    @Delete(':id')
    async remove(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<any> {
        return await this.videoService.remove(id);
    }
}
