import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Profile} from "./profiles.entity";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {UsersService} from "../users/users.service";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ProfilesService {

    constructor(
       @InjectRepository(Profile)
       private profileRepository: Repository<Profile>,
       private authService: AuthService,
       private usersService: UsersService
    ) {}

    // Регистрация нового пользователя.
    async registration(dto: CreateProfileDto) {

        // Создание профиля
        const profileInsertResult = await this.profileRepository.insert(dto);
        const createdProfileId = profileInsertResult.raw[0].id;
        const profile = await this.profileRepository.findOneBy({id: createdProfileId})

        // Создание учетных данных (User) для профиля
        const registrationResult = await this.authService.registration(dto);
        profile.user = registrationResult.User;

        await this.profileRepository.save(profile);
        return profile;
    }

    // Авторизация пользователя
    async login(dto: CreateProfileDto) {
        return this.authService.login(dto);
    }

    // Изменение профиля (Profile и User)
    async updateProfile(id: number, dto: CreateProfileDto) {
        try {
            // Изменение данных профиля
            await this.profileRepository
                .createQueryBuilder()
                .update()
                .set({
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    phone: dto.phone
                })
                .where('id = :id', {id})
                .returning('*')
                .execute();
            const profile = await this.profileRepository.findOne({where: {id}, relations: {user: true}});

            // Изменение учетных данных (User)
            const userId = profile.user.id;
            await this.usersService.updateUser(userId, dto);

            return await this.profileRepository.findOne({where: {id}, relations: {user: true}});
        } catch (e) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
    }

    // Удаление профиля и связанных учетных данных
    async deleteProfile(id: number) {
        const profile = await this.profileRepository.findOne({where: {id}, relations: {user: true}});
        const userId = profile.user.id;
        const deleteResult = await this.profileRepository
            .createQueryBuilder()
            .delete()
            .from(Profile)
            .where('id = :id', { id })
            .returning('*')
            .execute();

        await this.usersService.deleteUser(userId);

        return deleteResult;
    }

    // Получение всех профилей
    async getAllProfiles() {
        return await this.profileRepository.find({relations:{user: true}})
    }

    // Получение профиля по id
    async getProfileById(id: number) {
        return await this.profileRepository.findOne({where: {id}})
    }
}
