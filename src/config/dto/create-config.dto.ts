import {IsInt, IsNotEmpty} from 'class-validator';

export class CreateConfigDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    value: string;
}
