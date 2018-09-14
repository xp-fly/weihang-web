import {BadRequestException, Injectable} from '@nestjs/common';
import {Like, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ConfigEntity} from './entity/config.entity';
import {CreateConfigDto} from './dto/create-config.dto';

@Injectable()
export class ConfigService {
    constructor(
        @InjectRepository(ConfigEntity)
        private readonly configRepository: Repository<ConfigEntity>,
    ) {}

    /**
     * 配置列表
     * @param query
     */
    async list(query: any){
        const pageNo = +query.pageNo || 1;
        const limit = +query.pageSize || 10;
        const offset = (pageNo - 1) * limit;
        const where: any = {};
        if (query.name) {
            where.name = query.name;
        }
        return await this.configRepository.findAndCount({
            where,
            skip: offset,
            take: limit,
        });
    }

    /**
     * 创建标签
     * @param {CreateTagDto} tagDto
     * @returns {Promise<TagEntity>}
     */
    async add(tagDto: CreateConfigDto) {
        const find = await this.configRepository.findOne({
            where: {
                name: tagDto.name,
            },
        });
        if (find) {
            throw new BadRequestException('配置已存在');
        }
        const config = this.configRepository.create(tagDto);
        let type: any = typeof tagDto.value;
        if (Object.prototype.toString.call(tagDto.value) === '[Object Array]') {
            type = 'array';
        }
        config.type = type;
        return await this.configRepository.save(config);
    }

    /**
     * 标记配置
     * @param {number} id
     * @param {TagEntity} param
     * @returns {Promise<any>}
     */
    async edit(id: number, param: CreateConfigDto): Promise<any> {
        const config = await this.configRepository.findOne(id);
        if (!config) {
            throw new BadRequestException('配置不存在');
        }
        config.value = param.value;
        await this.configRepository.save(config);
    }

    /**
     * 删除配置
     * @param {number} id
     * @returns {Promise<any>}
     */
    async remove(id: number): Promise<any> {
        return await this.configRepository.delete(id);
    }

    /**
     * 根据名称查找
     * @param {string} name
     * @returns {Promise<ConfigEntity | undefined>}
     */
    async findOneByName(name: string) {
        return await this.configRepository.findOne({
            where: {
                name,
            },
        });
    }
}
