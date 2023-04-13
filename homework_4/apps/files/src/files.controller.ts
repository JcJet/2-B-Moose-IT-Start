import { Controller} from '@nestjs/common';
import { FilesService } from './files.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('create_file')
  async create(@Payload() data: any) {
    return await this.filesService.createFile(data.file, data.dto);
  }

  @MessagePattern('get_file')
  async get(@Payload() data: any) {
    console.log('1');
    return (await this.filesService.getFile(data.dto)) || '';
  }

  @MessagePattern('delete_file')
  async delete(@Payload() data: any) {
    return this.filesService.deleteFile(data.dto, true);
  }

  @MessagePattern('delete_unused')
  async deleteUnused() {
    return this.filesService.deleteUnused();
  }
}
