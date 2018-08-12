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
        comment: '标签类型 1 职位标签',
    })
    tagType: number;

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
}
