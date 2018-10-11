import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('partner')
export class PartnerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: '',
        comment: '合作伙伴名称',
    })
    name: string;

    @Column({
        default: '',
        name: 'image_url',
        comment: 'logo地址',
    })
    imageUrl: string;

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
