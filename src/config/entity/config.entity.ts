import {BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {JobEntity} from '../../job/entity/job.entity';

@Entity('config')
export class ConfigEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: '',
        comment: '配置名称',
    })
    name: string;

    @Column('text', {
        comment: '配置值',
    })
    value: string;

    @Column({
        default: '',
        comment: '配置类型 string array type',
    })
    type: string;

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
