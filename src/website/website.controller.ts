import {Controller, Get, Logger, Query} from '@nestjs/common';
import {ArticleService} from '../article/article.service';
import {VideoService} from '../video/video.service';
import {JobService} from '../job/job.service';
import {ApiUseTags} from '@nestjs/swagger';
import {TagService} from '../tag/tag.service';
import {ConfigService} from '../config/config.service';

@ApiUseTags('website')
@Controller('website')
export class WebsiteController {
    constructor(
        private readonly articleService: ArticleService,
        private readonly videoService: VideoService,
        private readonly jobService: JobService,
        private readonly tagService: TagService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * 文章列表
     * @returns {Promise<any>}
     */
    @Get('article')
    async fetchArticle(
        @Query() query: any,
    ): Promise<any> {
        query.state = 2;
        return await this.articleService.list(query);
    }

    /**
     * 视频列表
     * @returns {Promise<any>}
     */
    @Get('video')
    async fetchVideo(
        @Query() query: any,
    ): Promise<any> {
        query.state = 2;
        return await this.videoService.list(query);
    }

    /**
     * 岗位列表
     * @returns {Promise<any>}
     */
    @Get('job')
    async fetchJob(
        @Query() query: any,
    ): Promise<any> {
        query.state = 2;
        return await this.jobService.list(query);
    }

    @Get('tag')
    async fetchTag(
        @Query() query: any,
    ): Promise<any> {
        return await this.tagService.fetchAll(query, {id: 'ASC'});
    }

    @Get('liveConfig')
    async fetchLiveConfig() {
        const name = 'liveVideoConfig';
        const result = await this.configService.findOneByName(name);
        if (!result) {
            return {};
        }
        let config = {};
        try {
            config = JSON.parse(result.value);
        } catch (e) {
            Logger.error(e);
        }
        return config;
    }
}
