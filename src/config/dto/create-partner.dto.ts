import {IsNotEmpty} from 'class-validator';

export class CreatePartnerDto {
    id: number; // id

    @IsNotEmpty()
    name: string; // 合作伙伴名称

    @IsNotEmpty()
    imageUrl: string; // 合作伙伴logo地址
}
