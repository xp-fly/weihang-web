import {IsArray, IsNotEmpty} from 'class-validator';
import {TagEntity} from '../../tag/entity/tag.entity';

export class CreateJobDto {
    @IsNotEmpty()
    jobName: string;

    @IsNotEmpty()
    desc: string;

    @IsArray()
    tags: TagEntity[];
}
