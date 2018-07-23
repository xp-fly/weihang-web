import {Injectable} from '@nestjs/common';
import {ArticleEntity} from './article.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

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

    async add(article: ArticleEntity): Promise<ArticleEntity> {

    }

    async edit(id: number, article: ArticleEntity): Promise<any> {
        return 0;
    }

    async remove(id: number): Promise<any> {
        return 0;
    }
}
