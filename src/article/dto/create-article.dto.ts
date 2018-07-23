import {IsNotEmpty} from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    title: string;

    desc: string;

    @IsNotEmpty()
    content: string;
}
