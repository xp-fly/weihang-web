import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import * as path from 'path';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus ? exception.getStatus() : 500;
        if (status === 404) {
            const filePath = path.resolve(__dirname, '../../../../weihang_view/dist/weihang/index.html');
            response.sendFile(filePath);
        } else {
            response
                .status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: exception.message,
                    exception,
                });
        }
    }
}
