// common/middleware/public-route.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export interface PublicRouteRequest extends Request {
  isPublicRoute?: boolean;
}
@Injectable()
export class PublicRouteMiddleware implements NestMiddleware {
  // src/common/constants/public-routes.ts
  PUBLIC_ROUTES = [
    '/',
    '/users',
    '/login',
    '/register',
    '/products',
    /^\/products\/.*/, // route động
    '/about',
    '/contact',
    '/upload',
    '/client',
    /^\/client\/.*/,
    '/css',
    '/js',
    /^\/js\/.*/,
  ];

  use(req: Request, res: Response, next: NextFunction) {
    const PUBLIC_ROUTES: (string | RegExp)[] = this.PUBLIC_ROUTES;

    const isPublic: boolean = PUBLIC_ROUTES.some(
      (path: string | RegExp): boolean => {
        if (typeof path === 'string') {
          return req.path === path;
        } else if (path instanceof RegExp) {
          return path.test(req.path);
        }
        return false;
      },
    );

    (req as PublicRouteRequest).isPublicRoute = isPublic;

    next();
  }
}
