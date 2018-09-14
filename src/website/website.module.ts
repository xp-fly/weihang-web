import {Module} from '@nestjs/common';
import {WebsiteController} from './website.controller';
import {ArticleModule} from '../article/article.module';
import {VideoModule} from '../video/video.module';
import {JobModule} from '../job/job.module';
import {TagModule} from '../tag/tag.module';
import {ConfigModule} from '../config/config.module';

@Module({
    imports: [ArticleModule, VideoModule, JobModule, TagModule, ConfigModule],
    controllers: [WebsiteController],
})
export class WebsiteModule {}
