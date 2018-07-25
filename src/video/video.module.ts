import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VideoEntity} from './entity/video.entity';
import {VideoController} from './video.controller';
import {VideoService} from './video.service';

@Module({
    imports: [TypeOrmModule.forFeature([VideoEntity])],
    controllers: [VideoController],
    providers: [VideoService],
    exports: [VideoService],
})
export class VideoModule {}
