import {Injectable} from '@nestjs/common';
import {join} from 'path';
import {mkdirsSync} from '../utils/mkdir';
import * as fs from 'fs';
import moment = require('moment');
import {InjectRepository} from '@nestjs/typeorm';
import {VideoEntity} from './entity/video.entity';
import {Repository} from 'typeorm';

const videoDir = join(__dirname, '../public/video');

@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(VideoEntity)
        private readonly videoRepository: Repository<VideoEntity>,
    ) {}
    /**
     * 保存视频到public目录下
     * @param file
     * @returns {Promise<any>}
     */
    async saveFile(file: any): Promise<any> {
        const today = moment().format('YYYY/MM/DD');
        const mkdirDir = join(videoDir, today);
        await mkdirsSync(mkdirDir);
        const timestamp = Date.now();
        const arr = file.originalname.split('.');
        const fileName = `${arr[0]}_${timestamp}.${arr[arr.length - 1]}`;
        await new Promise((resolve, reject) => {
            fs.writeFile(
                `${mkdirDir}/${fileName}`,
                file.buffer,
                { flag: 'a' },
                err => {
                    if (err) reject(err);
                    resolve();
                });
        });
        return {
            path: `/video/${today}/${fileName}`,
        };
    }

    /**
     * 上传视频
     * @param file
     * @returns {Promise<any>}
     */
    async add(file: any): Promise<any> {
        const { path } = await this.saveFile(file);
        const video = this.videoRepository.create();
        video.title = file.originalname;
        video.path = path;
        video.createTime = new Date();
        return await this.videoRepository.save(video);
    }

    /**
     * 视频列表
     * @param query
     * @returns {Promise<any>}
     */
    async list(query: any): Promise<any> {
        const pageNo = +query.pageNo || 1;
        const limit = +query.pageSize || 10;
        const offset = (pageNo - 1) * limit;
        const [list, count = 0] = await this.videoRepository
            .createQueryBuilder('video')
            .orderBy({
                'video.id': 'DESC',
            })
            .offset(offset)
            .limit(limit)
            .getManyAndCount();
        return { count, list };
    }

    /**
     * 删除视频
     * @param {number} id
     * @returns {Promise<any>}
     */
    async remove(id: number): Promise<any> {
        return await this.videoRepository.delete(id);
    }

    /**
     * 编辑，修改视频的状态
     * @param {number} id
     * @param {VideoEntity} param
     * @returns {Promise<any>}
     */
    async edit(id: number, param: VideoEntity): Promise<any> {
        const video = this.videoRepository.create();
        if (param.state) {
            video.state = param.state;
        }
        if (!Object.keys(video).length) {
            return [];
        }
        return await this.videoRepository.update(id, video);
    }
}
