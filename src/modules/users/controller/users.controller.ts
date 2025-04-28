/*
https://docs.nestjs.com/controllers#controllers
*/

import { UsersService } from '@/modules/users/service/users.service';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
