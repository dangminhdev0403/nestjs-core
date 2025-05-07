import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseData } from './response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context
      .switchToHttp()
      .getResponse<{ statusCode: number }>();
    const status: number = response.statusCode;

    return next.handle().pipe(
      map((data: T): ResponseData<T> => {
        return new ResponseData<T>(status, null, 'Call API thành công', data);
      }),
    );
  }
}
