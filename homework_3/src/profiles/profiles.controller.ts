import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ProfilesService} from "./profiles.service";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('profiles')
export class ProfilesController {

    constructor(private profilesService: ProfilesService) {}

    // Эндпоинт для регистрации нового пользователя
    @Post('/registration')
    registration(@Body() profileDto: CreateProfileDto) {
        return this.profilesService.registration(profileDto);
    }

    // Эндпоинт для входа в уже созданную учетную запись
    @Post('/login')
    login(@Body() profileDto: CreateProfileDto) {
        return this.profilesService.login(profileDto)
    }

    // Эндпоинт для получения всех пользователей
    @Get()
    getAllUsers() {
        return this.profilesService.getAllProfiles()
    }

    // Эндпоинт для получения пользователя по ID
    @Get('/:id')
    getUserById(@Param('id') id: number) {
        return this.profilesService.getProfileById(id);
    }

    // Эндпоинт для изменения данных пользователя по id
    // TODO: сделать доступ для владельца профиля
    @Roles('ADMIN') // Доступ только для админа
    @UseGuards(RolesGuard)
    @Put('/:id')
    update(@Param('id') id: number, @Body() profileDto: CreateProfileDto) {
        return this.profilesService.updateProfile(id, profileDto)
    }

    // Эндпоинт для удаления учетной записи по id
    // TODO: сделать доступ для владельца профиля
    @Roles('ADMIN') // Доступ только для админа
    @UseGuards(RolesGuard)
    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.profilesService.deleteProfile(id);
    }
}
