import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AnyExceptionFilter} from './common/filters/any-exception.filter';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局路由前缀
  app.setGlobalPrefix('api');
  // 全局异常过滤器
  app.useGlobalFilters(new AnyExceptionFilter());
  // 全局校验
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
