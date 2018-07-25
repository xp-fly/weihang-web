import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('video')
export class VideoEntity {
    @PrimaryGeneratedColumn()
    id: number;

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
