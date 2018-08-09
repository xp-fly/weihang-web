import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

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

    @CreateDateColumn({
        name: 'create_time',
    })
    createTime: Date;

    @UpdateDateColumn({
        name: 'update_time',
    })
    updateTime: Date;
}
