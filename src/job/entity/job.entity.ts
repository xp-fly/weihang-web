import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {TagEntity} from '../../tag/entity/tag.entity';

@Entity('job')
export class JobEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'job_name',
        default: '',
        comment: '职位名称',
    })
    jobName: string;

    @Column('int', {
        default: 1,
        comment: '职位状态 1 未审核 2 审核通过 3 结束',
    })
    state: number;

    @Column({
        default: '',
        comment: '职位描述',
    })
    desc: string;

    @CreateDateColumn({
        name: 'create_time',
    })
    createTime: Date;

    @UpdateDateColumn({
        name: 'update_time',
    })
    updateTime: Date;

    /* 定义关联关系 */
    @ManyToMany(type => TagEntity, tags => tags.jobs)
    @JoinTable()
    tags: TagEntity[];
}
