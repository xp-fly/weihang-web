import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigEntity} from './entity/config.entity';
import {ConfigController} from './config.controller';
import {ConfigService} from './config.service';
import {PartnerEntity} from './entity/partner.entity';
import {PartnerController} from './partner.controller';
import {PartnerService} from './partner.service';

@Module({
    imports: [TypeOrmModule.forFeature([ConfigEntity, PartnerEntity])],
    controllers: [ConfigController, PartnerController],
    providers: [ConfigService, PartnerService],
    exports: [ConfigService, PartnerService],
})
export class ConfigModule {}
