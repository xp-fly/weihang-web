import {IsNotEmpty} from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    title: string;

    desc: string;

    summary: string;

    @IsNotEmpty()
    publishTime: Date;

    @IsNotEmpty()
    content: string;
}
