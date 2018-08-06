import {PrimaryGeneratedColumn} from 'typeorm';

export class JobEntity {
    @PrimaryGeneratedColumn()
    id: number;

    jobName: string;
}
