import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('profile_login')
  @Post('login')
  async login(@Payload() data: any) {
    return await this.authService.login(data.dto);
  }

  @MessagePattern('profile_created')
  @Post()
  async create(@Payload() data: any) {
    return await this.authService.registration(data.dto);
  }
}
