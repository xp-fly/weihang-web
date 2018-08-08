import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JobEntity} from './entity/job.entity';
import {JobController} from './job.controller';
import {JobService} from './job.service';

@Module({
    imports: [TypeOrmModule.forFeature([JobEntity])],
    controllers: [JobController],
    providers: [JobService],
    exports: [JobService],
})
export class JobModule {}
