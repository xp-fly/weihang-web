import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ArticleModule} from './article/article.module';
import {Connection} from 'typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
