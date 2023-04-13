import { Controller } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('registration')
  async registration(@Payload() data: any) {
    return await this.profilesService.registration(data.dto);
  }

  @MessagePattern('login')
  async login(@Payload() data: any) {
    return await this.profilesService.login(data.dto);
  }

  @MessagePattern('get_all_profiles')
  async getAllUsers() {
    return await this.profilesService.getAllProfiles();
  }

  @MessagePattern('update_profile')
  async update(@Payload() data: any) {
    return await this.profilesService.updateProfile(data.id, data.dto);
  }

  @MessagePattern('delete_profile')
  async delete(@Payload() data: any) {
    return await this.profilesService.deleteProfile(data.id);
  }
}
