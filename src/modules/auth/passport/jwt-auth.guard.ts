import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Mảng các route public mà không cần xác thực
  private readonly PUBLIC_ROUTES = [
    '/',
    '/users',
    '/login',
    '/register',
    '/products',
    /^\/products\/.*/, // regex cho route động
    /^\/auth\/.*/,
    '/about',
    '/contact',
    '/upload',
    '/client',
    /^\/client\/.*/,
    '/css',
    '/js',
    /^\/js\/.*/,
  ];

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const url = request.url;

    // Kiểm tra xem route hiện tại có trong danh sách public hay không
    const isPublicRoute = this.isPublicRoute(url);
    if (isPublicRoute) return true; // Nếu là route public, cho phép truy cập

    // Nếu không phải là route public, gọi method canActivate của AuthGuard
    return super.canActivate(context);
  }

  // Hàm kiểm tra route có phải là route public không
  private isPublicRoute(url: string): boolean {
    return this.PUBLIC_ROUTES.some((route) => {
      if (typeof route === 'string') {
        return route === url; // Kiểm tra trực tiếp nếu là string
      }
      return route.test(url); // Kiểm tra bằng regex nếu là pattern động
    });
  }
}
