import { Controller, Delete, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('create_user')
  @Post()
  async create(@Payload() data: any) {
    return this.usersService.createUser(data);
  }

  @MessagePattern('get_user_by_email')
  @Post()
  async get_by_email(@Payload() data: any) {
    return this.usersService.getUserByEmail(data);
  }

  @MessagePattern('delete_user')
  @Delete()
  async delete(@Payload() data: any) {
    return this.usersService.deleteUser(data.userId);
  }

  @MessagePattern('update_user')
  @Put()
  async update(@Payload() data: any) {
    return this.usersService.updateUser(data.userId, data.dto);
  }
}
