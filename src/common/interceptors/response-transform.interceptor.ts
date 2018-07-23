import {ExecutionContext, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';

export interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
}

/**
 * 格式化回包内容
 */
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        call$: Observable<T>,
    ): Observable<Response<T>> {
        return call$.pipe(map(data => ({
            statusCode: 200,
            message: 'success',
            data,
        })));
    }
}
