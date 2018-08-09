import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {JobEntity} from '../../job/entity/job.entity';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'tag_name',
        default: '',
        comment: '标签名称',
    })
    tagName: string;

    @Column('int', {
        name: 'tag_type',
        default: 1,
        comment: '标签类型 1 文章标签 2 视频标签 3 职位标签',
    })
    tagType: number;

    @CreateDateColumn({
        name: 'create_time',
    })
    createTime: Date;

    @UpdateDateColumn({
        name: 'update_time',
    })
    updateTime: Date;

    /* 定义关联关系 */
    @ManyToMany(type => JobEntity, jobs => jobs.tags)
    jobs: JobEntity[];
}
