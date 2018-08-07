import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
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

    @Column('datetime', {
        name: 'create_time',
        default: null,
    })
    createTime: Date;

    @Column('timestamp', {
        name: 'update_time',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updateTime: Date;

    /* 定义关联关系 */
    @ManyToMany(type => TagEntity, tags => tags.jobs)
    @JoinTable()
    tags: TagEntity[];
}
