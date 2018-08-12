import {Module} from '@nestjs/common';
import {WebsiteController} from './website.controller';
import {ArticleModule} from '../article/article.module';
import {VideoModule} from '../video/video.module';
import {JobModule} from '../job/job.module';

@Module({
    imports: [ArticleModule, VideoModule, JobModule],
    controllers: [WebsiteController],
})
export class WebsiteModule {}
