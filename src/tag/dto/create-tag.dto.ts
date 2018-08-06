import {IsInt, IsNotEmpty} from 'class-validator';

export class CreateTagDto {
    @IsNotEmpty()
    tagName: string;

    @IsInt()
    tagType: number;
}
