import {IsNotEmpty} from 'class-validator';

export class CreateVideoDto {
    @IsNotEmpty()
    imageUrl: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    path: string;
}
