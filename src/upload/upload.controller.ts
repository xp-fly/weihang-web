import {Controller, FileInterceptor, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {UploadService} from './upload.service';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('upload')
@UseGuards(AuthGuard('jwt'))
@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService,
    ) {}

    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @UploadedFile() file: any,
    ): Promise<any> {
        const type: string = 'img';
        return await this.uploadService.saveFile(file, type);
    }
}
