import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards} from '@nestjs/common';
import {JobService} from './job.service';
import {CreateJobDto} from './dto/create-job.dto';
import {JobEntity} from './entity/job.entity';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('job')
@UseGuards(AuthGuard('jwt'))
@Controller('job')
export class JobController {
    constructor(
        private readonly jobService: JobService,
    ) {}

    /**
     * 职位列表
     * @param {object} query
     * @returns {Promise<any>}
     */
    @Get()
    async list(
        @Query() query: object,
    ) {
        return await this.jobService.list(query);
    }

    /**
     * 创建职位
     * @param {CreateJobDto} jobDto
     * @returns {Promise<JobEntity>}
     */
    @Post()
    async add(
        @Body() jobDto: CreateJobDto,
    ) {
        return await this.jobService.add(jobDto);
    }

    /**
     * 修改职位
     * @param {number} id
     * @param {JobEntity} job
     * @returns {Promise<any>}
     */
    @Put(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() job: any,
    ) {
        return await this.jobService.edit(id, job);
    }

    /**
     * 删除职位
     * @param {number} id
     * @returns {Promise<any>}
     */
    @Delete(':id')
    async remove(
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        return await this.jobService.remove(id);
    }
}
