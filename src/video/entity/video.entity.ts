import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TagEntity} from '../../tag/entity/tag.entity';

@Entity('video')
export class VideoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', {
        default: 1,
        comment: '视频类型',
    })
    videoType: number;

    @Column('int', {
        default: 1,
        comment: '视频状态 1 待审核 2 审核完成',
    })
    state: number;

    @Column()
    title: string;

    @Column({
        default: '',
    })
    path: string;

    @Column('timestamp', {
        name: 'create_time',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createTime: Date;

    @Column('timestamp', {
        name: 'update_time',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updateTime: Date;
}
