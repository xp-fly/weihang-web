import {Controller, FileInterceptor, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {UploadService} from './upload.service';

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
