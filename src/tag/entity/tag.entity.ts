import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ArticleEntity} from '../../article/entity/article.entity';
import {VideoEntity} from '../../video/entity/video.entity';

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

    /* 定义关联关系 */
    /*@ManyToMany(type => ArticleEntity, articles => articles.tags)
    articles: ArticleEntity[];*/
}
