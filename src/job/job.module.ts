import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JobEntity} from './entity/job.entity';
import {JobController} from './job.controller';
import {JobService} from './job.service';
import {TagEntity} from '../tag/entity/tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([JobEntity, TagEntity])],
    controllers: [JobController],
    providers: [JobService],
    exports: [JobService],
})
export class JobModule {}
