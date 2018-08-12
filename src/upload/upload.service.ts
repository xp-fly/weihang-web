import {HttpException, Injectable} from '@nestjs/common';
import {mkdirsSync} from '../utils/mkdir';
import moment = require('moment');
import {join} from 'path';
import {writeFile} from 'fs';

@Injectable()
export class UploadService {
    /**
     * 保存视频到public目录下
     * @param file
     * @param type
     * @returns {Promise<any>}
     */
    async saveFile(file: any, type: string): Promise<any> {
        if (!type) {
            throw new HttpException('type is required', 500);
        }
        const fileDir = join(__dirname, `../public/${type}`);
        const today = moment().format('YYYY/MM/DD');
        const mkdirDir = join(fileDir, today);
        await mkdirsSync(mkdirDir);
        const timestamp = Date.now();
        const arr = file.originalname.split('.');
        const fileName = `${arr[0]}_${timestamp}.${arr[arr.length - 1]}`;
        await new Promise((resolve, reject) => {
            writeFile(
                `${mkdirDir}/${fileName}`,
                file.buffer,
                { flag: 'a' },
                err => {
                    if (err) reject(err);
                    resolve();
                });
        });
        return {
            path: `/${type}/${today}/${fileName}`,
        };
    }
}
