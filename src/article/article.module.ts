import {ArticleService} from './article.service';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ArticleEntity} from './entity/article.entity';
import {ArticleController} from './article.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity])],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService],
})
export class ArticleModule {
    constructor(private readonly articleService: ArticleService) {}
}
