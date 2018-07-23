import {Injectable} from '@nestjs/common';
import {ArticleEntity} from './entity/article.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateArticleDto} from './dto/create-article.dto';
import * as xss from "xss";

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

    async add(articleDto: CreateArticleDto): Promise<ArticleEntity> {
        const article = this.articleRepository.create();
        article.title = articleDto.title;
        article.content = articleDto.desc;
        article.content = xss(articleDto.content, xssOpt);
        return await this.articleRepository.save(article);
    }

    async edit(id: number, article: ArticleEntity): Promise<any> {
        return 0;
    }

    async remove(id: number): Promise<any> {
        return 0;
    }
}
