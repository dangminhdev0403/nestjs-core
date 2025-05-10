/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard) // <-- Guard dùng chiến lược 'local'
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: { user: User }): Promise<any> {
    return Promise.resolve(this.authService.login(req.user)); // Bọc trong Promise
  } // req.user là user đã được xác thực bởi LocalStrategy
}
