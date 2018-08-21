import {BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('video')
export class VideoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', {
        name: 'video_type',
        default: 1,
        comment: '视频类型',
    })
    videoType: number;

    @Column()
    imageUrl: string;

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

    @BeforeInsert()
    insertCreateTime() {
        this.createTime = new Date();
    }
}
