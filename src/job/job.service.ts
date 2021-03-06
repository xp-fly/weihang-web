import {HttpException, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {JobEntity} from './entity/job.entity';
import {CreateJobDto} from './dto/create-job.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {TagEntity} from '../tag/entity/tag.entity';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobEntity)
        private readonly jobRepository: Repository<JobEntity>,
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
    ) {}

    /**
     * 返回职位列表
     * @param query
     * @returns {Promise<any>}
     */
    async list(query: any): Promise<any> {
        const pageNo = +query.pageNo || 1;
        const limit = +query.pageSize || 10;
        const offset = (pageNo - 1) * limit;
        const where: any = {};
        if (query.jobName && query.jobName.trim()) {
            where.jobName = query.jobName;
        }
        if (query.state) {
            where.state = query.state;
        }
        if (query.tagId) {
            where.tagId = query.tagId;
        }
        const [list, count = 0] = await this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.tag', 'tag')
            .where(where)
            .orderBy({
                'job.create_time': 'DESC',
            })
            .offset(offset)
            .limit(limit)
            .getManyAndCount();
        return { list, count };
    }

    /**
     * 创建职位
     * @param {CreateJobDto} jobDto
     * @returns {Promise<JobEntity>}
     */
    async add(jobDto: CreateJobDto): Promise<JobEntity> {
        const job = this.jobRepository.create();
        job.jobName = jobDto.jobName;
        job.desc = jobDto.desc;
        job.experience = jobDto.experience;
        job.tag = this.tagRepository.create({ id: jobDto.tagId });
        return await this.jobRepository.save(job);
    }

    /**
     * 修改职位
     * @param {number} id
     * @param {JobEntity} param
     * @returns {Promise<any>}
     */
    async edit(id: number, param: JobEntity & CreateJobDto): Promise<any> {
        const job = this.jobRepository.create();
        if (param.jobName) {
            job.jobName = param.jobName;
        }
        if (param.desc) {
            job.desc = param.desc;
        }
        if (param.tagId) {
            job.tag = this.tagRepository.create({id: param.tagId});
        }
        if (param.state) {
            job.state = param.state;
        }
        if (param.experience) {
            job.experience = param.experience;
        }
        if (!Object.keys(job).length) {
            return [];
        }
        await this.jobRepository.update(id, job);
    }

    /**
     * 删除职位
     * @param {number} id
     * @returns {Promise<any>}
     */
    async remove(id: number): Promise<any> {
        return await this.jobRepository.delete(id);
    }
}
