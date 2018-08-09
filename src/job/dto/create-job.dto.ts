import {IsArray, IsInt, IsNotEmpty} from 'class-validator';
import {TagEntity} from '../../tag/entity/tag.entity';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateJobDto {
    @ApiModelProperty({
        description: '岗位名称',
        required: true,
        type: 'string',
    })
    @IsNotEmpty()
    jobName: string;

    @ApiModelProperty({
        description: '岗位描述',
        type: 'string',
    })
    @IsNotEmpty()
    desc: string;

    @ApiModelProperty({
        description: '标签ID',
        type: 'number',
    })
    @IsInt()
    tagId: number;
}
