import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AnyExceptionFilter} from './common/filters/any-exception.filter';
import {ValidationPipe} from '@nestjs/common';
import {ResponseTransformInterceptor} from './common/interceptors/response-transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {join} from 'path';
import {AuthGuard} from '@nestjs/passport';
import * as compression from 'compression';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(compression({
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                // don't compress responses with this request header
                return false;
            }
            // fallback to standard filter function
            return compression.filter(req, res);
        },
    }))
    // 全局路由前缀
    app.setGlobalPrefix('api');
    // 全局异常过滤器
    app.useGlobalFilters(new AnyExceptionFilter());
    // 全局校验
    app.useGlobalPipes(new ValidationPipe());
    // 全局拦截器
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    // 使用多次可以设置多个静态目录，设置静态目录
    // 官网静态目录
    app.useStaticAssets(join(__dirname, '../../weihang_view/dist/weihang'));
    // 后台静态目录
    app.useStaticAssets(join(__dirname, '../../weihang-admin-view/dist'));
    // 项目的静态目录
    app.useStaticAssets(join(__dirname, '/public'));
    app.useStaticAssets(join(__dirname, '../static'));
    const swaggerOpts = new DocumentBuilder()
        .setTitle('api doc')
        .setDescription('api description')
        .setVersion('1.0')
        .addTag('api')
        .setBasePath('api')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, swaggerOpts)
    if (process.env.NODE_ENV !== 'production') {
        SwaggerModule.setup('doc', app, document);
    }
    await app.listen(3000);
}
bootstrap();
