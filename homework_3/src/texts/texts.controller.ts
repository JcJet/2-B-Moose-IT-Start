import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateTextDto} from "./dto/create-text.dto";
import {TextsService} from "./texts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('texts')
export class TextsController {

    constructor(private textsService: TextsService) {}

    // Эндпоинт для создания нового текстового блока
    @Roles('ADMIN') // Только для админа
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createText(@Body() dto: CreateTextDto,
               @UploadedFile() image) {
        return this.textsService.create(dto, image)
    }

    // Эндпоинт для получения всех текстовых блоков
    @Get()
    getAll() {
        return this.textsService.getAllTexts();
    }

    // Эндпоинт для получения всех текстовых блоков заданной группы
    @Get('/group/:group')
    getTextsByGroup(@Param('group') group: string){
        return this.textsService.getAllTextsFromGroup(group);
    }

    // Эндпоинт для получения текстового блока по уникальному строковому идентификатору
    @Get('/:str')
    getText(@Param('str') str: string) {
        return this.textsService.get(str);
    }

    // Эндпоинт для изменения текстового блока
    @Roles('ADMIN') // Доступ только для админа
    @UseGuards(RolesGuard)
    @Put()
    @UseInterceptors(FileInterceptor('image'))
    updateText(@Body() dto: CreateTextDto,
               @UploadedFile() image = undefined) {
        return this.textsService.update(dto, image);
    }

    // Эндпоинт для удаления текстового блока по уникальному строковому идентификатору
    @Roles('ADMIN') // Доступ только для админа
    @UseGuards(RolesGuard)
    @Delete('/:str')
    deleteText(@Param('str') str: string) {
        return this.textsService.delete(str);
    }
}
