import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TEXTS_SERVICE } from '../../profiles/src/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProfileDto } from '../../profiles/src/dto/create-profile.dto';
import { Roles } from '../../auth/src/roles-auth.decorator';
import { RolesGuard } from '../../auth/src/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTextDto } from '../../texts/src/dto/create-text.dto';
import { lastValueFrom } from 'rxjs';
import { PROFILES_SERVCE } from './constants/services';

@Controller('api')
export class Hw4Controller {
  constructor(
    @Inject(PROFILES_SERVCE) private profilesClient: ClientProxy,
    @Inject(TEXTS_SERVICE) private textsClient: ClientProxy,
  ) {}

  // Эндпоинт для регистрации нового пользователя
  @Post('/registration')
  async registration(@Body() profileDto: CreateProfileDto) {
    return await lastValueFrom(
      this.profilesClient.send('registration', { dto: profileDto }),
    );
  }

  // Эндпоинт для входа в уже созданную учетную запись
  @Post('/login')
  async login(@Body() profileDto: CreateProfileDto) {
    return await lastValueFrom(
      this.profilesClient.send('login', { dto: profileDto }),
    );
  }

  // Эндпоинт для получения всех пользователей
  @Get('/profiles')
  async getAllUsers() {
    return await lastValueFrom(
      this.profilesClient.send('get_all_profiles', {}),
    );
  }

  // Эндпоинт для изменения данных пользователя по id
  // TODO: сделать доступ для владельца профиля
  @Roles('ADMIN') // Доступ только для админа
  @UseGuards(RolesGuard)
  @Put('/profiles/:id')
  async update(@Param('id') id: number, @Body() profileDto: CreateProfileDto) {
    return await lastValueFrom(
      this.profilesClient.send('update_profile', { id, dto: profileDto }),
    );
  }

  @Delete('/profiles/:id')
  async delete(@Param('id') id: number) {
    return await lastValueFrom(
      this.profilesClient.send('delete_profile', { id }),
    );
  }

  //Эндпоинты для работы с текстами

  // Эндпоинт для создания текстового блока
  @Roles('ADMIN') // Только для админа
  @UseGuards(RolesGuard)
  @Post('/texts')
  @UseInterceptors(FileInterceptor('image'))
  async createText(@Body() dto: CreateTextDto, @UploadedFile() image) {
    return await lastValueFrom(
      this.textsClient.send('create_text', { dto, image }),
    );
  }

  // Эндпоинт для получения всех текстовых блоков
  @Get('/texts')
  async getAll() {
    console.log(this.textsClient);
    return await lastValueFrom(this.textsClient.send('get_all_texts', {}));
  }

  // Эндпоинт для получения всех текстовых блоков заданной группы
  @Get('/texts/group/:group')
  async getTextsByGroup(@Param('group') group: string) {
    return await lastValueFrom(
      this.textsClient.send('get_text_by_group', { group }),
    );
  }

  // Эндпоинт для получения текстового блока по уникальному строковому идентификатору
  @Get('/texts/:str')
  async getText(@Param('str') str: string) {
    return await lastValueFrom(
      this.textsClient.send('get_text_by_str', { str }),
    );
  }

  // Эндпоинт для изменения текстового блока
  @Roles('ADMIN') // Доступ только для админа
  @UseGuards(RolesGuard)
  @Put('/texts')
  @UseInterceptors(FileInterceptor('image'))
  async updateText(
    @Body() dto: CreateTextDto,
    @UploadedFile() image = undefined,
  ) {
    return await lastValueFrom(
      this.textsClient.send('update_text', { dto, image }),
    );
  }

  // Эндпоинт для удаления текстового блока по уникальному строковому идентификатору
  @Roles('ADMIN') // Доступ только для админа
  @UseGuards(RolesGuard)
  @Delete('/texts/:str')
  async deleteText(@Param('str') str: string) {
    return await lastValueFrom(this.textsClient.send('delete_text', { str }));
  }
}
