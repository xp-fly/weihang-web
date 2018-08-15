import {BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
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

    @Column({
        default: '',
        comment: '职位经验要求',
    })
    experience: string;

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

    @Column({
        name: 'tag_id',
        comment: '关联标签表外键',
    })
    tagId: number;

    /* 定义关联关系 */
    @ManyToOne(type => TagEntity)
    @JoinColumn({
        name: 'tag_id',
    })
    tag: TagEntity;

    @BeforeInsert()
    insertCreateTime() {
        this.createTime = new Date();
    }
}
