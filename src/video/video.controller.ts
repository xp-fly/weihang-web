import {Controller, Delete, FileInterceptor, Get, Param, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {VideoService} from './video.service';

@Controller('video')
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
