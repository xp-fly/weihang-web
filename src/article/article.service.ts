import {Injectable} from '@nestjs/common';
import {ArticleEntity} from './entity/article.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateArticleDto} from './dto/create-article.dto';
import * as xss from 'xss';
import * as moment from 'moment';

const xssOpt = {
    whiteList: {
        pre: ['class'],
        code: ['class'],
        div: ['class'],
        span: ['class'],
        a: ['href'],
        p: [],
        img: ['src', 'alt', 'title'],
    },
};

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
    ) {}

    /**
     * 文章列表
     * @param query
     * @returns {Promise<any>}
     */
    async list(query: any): Promise<any> {
        const pageNo = +query.pageNo || 1;
        const limit = +query.pageSize || 10;
        const offset = (pageNo - 1) * limit;
        const [list, count = 0] = await this.articleRepository
            .createQueryBuilder('article')
            .orderBy({
                'article.create_time': 'DESC',
            })
            .offset(offset)
            .limit(limit)
            .getManyAndCount();
        return { list, count };
    }

    /**
     * 上传文章
     * @param {CreateArticleDto} articleDto
     * @returns {Promise<ArticleEntity>}
     */
    async add(articleDto: CreateArticleDto): Promise<ArticleEntity> {
        const article = this.articleRepository.create();
        article.title = articleDto.title;
        article.content = articleDto.desc;
        article.publishTime = articleDto.publishTime;
        article.summary = articleDto.summary;
        // 防止xss攻击
        article.content = xss(articleDto.content, xssOpt);
        return await this.articleRepository.save(article);
    }

    /**
     * 编辑文章
     * @param {number} id
     * @param {ArticleEntity} param
     * @returns {Promise<any>}
     */
    async edit(id: number, param: ArticleEntity): Promise<any> {
        const article = this.articleRepository.create();
        if (param.title) {
            article.title = param.title;
        }
        if (param.content) {
            article.content = param.content;
        }
        if (param.desc) {
            article.desc = param.desc;
        }
        if (param.state) {
            article.state = param.state;
        }
        if (!Object.keys(article).length) {
            return [];
        }
        return await this.articleRepository.update(id, article);

    }

    /**
     * 删除文章
     * @param {number} id
     * @returns {Promise<any>}
     */
    async remove(id: number): Promise<any> {
        return await this.articleRepository.delete(id);
    }

    /**
     * 根据ID获取文章
     * @param {number} id
     * @returns {Promise<void>}
     */
    async findOneById(id: number) {
        return await this.articleRepository.findOne(id);
    }
}
