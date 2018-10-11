import {BadRequestException, HttpException, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {PartnerEntity} from './entity/partner.entity';
import {CreatePartnerDto} from './dto/create-partner.dto';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class PartnerService {
    constructor(
        @InjectRepository(PartnerEntity)
        private readonly partnerRepository: Repository<PartnerEntity>,
    ) {}

    /**
     * 创建
     * @param {CreatePartnerDto} body
     * @returns {Promise<CreatePartnerDto>}
     */
    async add(body: CreatePartnerDto) {
        const find = await this.partnerRepository.findOne({
            where: {name: body.name},
        });
        if (find) {
            throw new BadRequestException('该名称已存在');
        }
        return await this.partnerRepository.save(body);
    }

    /**
     * 修改
     * @param {number} id
     * @param {CreatePartnerDto} body
     * @returns {Promise<PartnerEntity>}
     */
    async edit(id: number, body: CreatePartnerDto) {
        const partner = await this.partnerRepository.findOne(id);
        if (!partner) {
            throw new HttpException('id not found', 404);
        }
        partner.name = body.name.trim();
        partner.imageUrl = body.imageUrl.trim();
        return await this.partnerRepository.save(partner);
    }

    /**
     * 列表
     * @param query
     * @returns {Promise<[PartnerEntity[] , number]>}
     */
    async list(query: any) {
        const pageNo = +query.pageNo || 1;
        const limit = +query.pageSize || 10;
        const offset = (pageNo - 1) * limit;
        const where: any = {};
        return await this.partnerRepository.findAndCount({
            skip: offset,
            take: limit,
            order: {id: 'DESC'},
        });
    }

    /**
     * 删除
     * @param {number} id
     * @returns {Promise<DeleteResult>}
     */
    async delete(id: number) {
        return await this.partnerRepository.delete(id);
    }
}
