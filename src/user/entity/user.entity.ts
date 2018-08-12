import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        unique: true,
        comment: '用户名',
    })
    username: string;

    @Column({
        length: 18,
        comment: '用户名密码',
    })
    password: string;

    @Column({
        length: 100,
        default: '',
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

    @BeforeInsert()
    insertCreateTime() {
        this.createTime = new Date();
    }
}
