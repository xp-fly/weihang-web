import {Injectable} from '@nestjs/common';
import {TagEntity} from './entity/tag.entity';
import {Like, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateTagDto} from './dto/create-tag.dto';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
    ) {}

    /**
     * 标签列表
     * @param query
     * @returns {Promise<object>}
     */
    async list(query: any): Promise<object> {
        const [list, count = 0] = await this.getListData(query);
        return { list, count };
    }

    /**
     * 创建标签
     * @param {CreateTagDto} tagDto
     * @returns {Promise<TagEntity>}
     */
    async add(tagDto: CreateTagDto): Promise<TagEntity> {
        const tag = this.tagRepository.create();
        tag.tagName = tagDto.tagName;
        tag.tagType = tagDto.tagType;
        return await this.tagRepository.save(tag);
    }

    /**
     * 编辑标签
     * @param {number} id
     * @param {TagEntity} param
     * @returns {Promise<any>}
     */
    async edit(id: number, param: TagEntity): Promise<any> {
        const tag = this.tagRepository.create();
        if (param.tagName) {
            tag.tagName = param.tagName;
        }
        if (param.tagType) {
            tag.tagType = param.tagType;
        }
        if (!Object.keys(tag).length) {
            return [];
        }
        await this.tagRepository.update(id, tag);
    }

    /**
     * 删除标签
     * @param {number} id
     * @returns {Promise<any>}
     */
    async remove(id: number): Promise<any> {
        return await this.tagRepository.delete(id);
    }

    /**
     * 查询所有标签上护具
     * @param query
     * @param order
     * @returns {Promise<any>}
     */
    async fetchAll(query: any, order: any = {}): Promise<any> {
         return await this.getListData(query, false, order);
    }

    /**
     * 获取标签数据
     * @param query
     * @param {boolean} pagination
     * @returns {Promise<[TagEntity[] , number] | TagEntity[]>}
     */
    async getListData(query: any, pagination = true, order: any = {}): Promise<[TagEntity[], number] | TagEntity[]> {
        const pageNo = +query.pageNo || 1;
        const limit = +query.pageSize || 10;
        const offset = (pageNo - 1) * limit;
        const where: any = {};
        if (query.tagName && query.tagName.trim()) {
            where.tagName = Like(`%${query.tagName.trim()}%`);
        }
        const tagPromise = this.tagRepository
            .createQueryBuilder('tag')
            .where(where)
            .orderBy({
                'tag.create_time': 'DESC',
            });
        if (order && order.id) {
            tagPromise.orderBy({
                'tag.id': order.id,
            });
        }
        let result: [TagEntity[], number] | TagEntity[];
        if (pagination) {
            result = await tagPromise
                .offset(offset)
                .limit(limit)
                .getManyAndCount();
        } else {
            result = await tagPromise.getMany();
        }
        return result;
    }
}
