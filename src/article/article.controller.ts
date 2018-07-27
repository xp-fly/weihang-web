import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ArticleService} from './article.service';
import {ArticleEntity} from './entity/article.entity';
import {CreateArticleDto} from './dto/create-article.dto';
import { ApiUseTags } from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@ApiUseTags('article')
@Controller('article')
@UseGuards(AuthGuard('jwt'))
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}
    @Get()
    async list(@Query() query: object): Promise<ArticleEntity[]> {
        return await this.articleService.list(query);
    }

    @Post()
    async add(@Body() article: CreateArticleDto): Promise<ArticleEntity> {
        return await this.articleService.add(article);
    }

    @Put(':id')
    async edit(@Param('id', new ParseIntPipe()) id: number, @Body() article: ArticleEntity): Promise<any> {
        return await this.articleService.edit(id, article);
    }

    @Delete(':id')
    async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        return await this.articleService.remove(id);
    }
}
