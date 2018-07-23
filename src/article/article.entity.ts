import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('article')
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: '',
        comment: '文章标题',
    })
    title: string;

    @Column({
        default: '',
        comment: '文章描述',
    })
    desc: string;

    @Column('longtext', {
        default: '',
        comment: '文章内容',
    })
    content: string;

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
