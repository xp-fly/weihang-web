import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ArticleModule} from './article/article.module';
import {Connection} from 'typeorm';
import {VideoModule} from './video/video.module';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {TagModule} from './tag/tag.module';
import {JobModule} from './job/job.module';
import {UploadModule} from './upload/upload.module';
import {WebsiteModule} from './website/website.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      ArticleModule,
      VideoModule,
      UserModule,
      AuthModule,
      TagModule,
      JobModule,
      UploadModule,
      WebsiteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
