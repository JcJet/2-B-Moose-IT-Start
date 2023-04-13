import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TextsService } from './texts.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class TextsController {
  constructor(private readonly textsService: TextsService) {}

  @MessagePattern('create_text')
  @Post()
  async createText(@Payload() data: any) {
    return this.textsService.create(data.dto, data.image);
  }

  // Эндпоинт для получения всех текстовых блоков
  @MessagePattern('get_all_texts')
  @Get('/texts')
  async getAll() {
    return this.textsService.getAllTexts();
  }

  // Эндпоинт для получения всех текстовых блоков заданной группы
  @MessagePattern('get_text_by_group')
  @Get('/group/:group')
  async getTextsByGroup(@Payload() data: any) {
    return this.textsService.getAllTextsFromGroup(data.group);
  }

  // Эндпоинт для получения текстового блока по уникальному строковому идентификатору
  @MessagePattern('get_text_by_str')
  @Get('/:str')
  async getText(@Payload() data: any) {
    return this.textsService.get(data.str);
  }

  // Эндпоинт для изменения текстового блока
  @MessagePattern('update_text')
  @Put()
  async updateText(@Payload() data: any) {
    return this.textsService.update(data.dto, data.image);
  }

  // Эндпоинт для удаления текстового блока по уникальному строковому идентификатору
  @MessagePattern('delete_text')
  @Delete('/:str')
  async deleteText(@Payload() data: any) {
    return this.textsService.delete(data.str);
  }
}
