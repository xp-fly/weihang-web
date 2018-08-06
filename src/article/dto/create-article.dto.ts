import {IsInt, IsNotEmpty} from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    title: string;

    @IsInt()
    articleType: number;

    desc: string;

    summary: string;

    @IsNotEmpty()
    publishTime: Date;

    @IsNotEmpty()
    content: string;
}
