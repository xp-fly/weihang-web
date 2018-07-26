import {IsNotEmpty} from 'class-validator';

export class AuthLoginDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;
}
