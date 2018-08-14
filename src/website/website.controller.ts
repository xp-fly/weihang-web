import {Controller, Get, Query} from '@nestjs/common';
import {ArticleService} from '../article/article.service';
import {VideoService} from '../video/video.service';
import {JobService} from '../job/job.service';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('website')
@Controller('website')
export class WebsiteController {
    constructor(
        private readonly articleService: ArticleService,
        private readonly videoService: VideoService,
        private readonly jobService: JobService,
    ) {}

    /**
     * 文章列表
     * @returns {Promise<any>}
     */
    @Get('article')
    async fetchArticle(): Promise<any> {
        const param = {
            state: 2,
        };
        return await this.articleService.list(param);
    }

    /**
     * 视频列表
     * @returns {Promise<any>}
     */
    @Get('video')
    async fetchVideo(): Promise<any> {
        const param = {
            state: 2,
        };
        return await this.videoService.list(param);
    }

    /**
     * 岗位列表
     * @returns {Promise<any>}
     */
    @Get('job')
    async fetchJob(): Promise<any> {
        const param = {
            state: 2,
        };
        return await this.jobService.list(param);
    }
}