import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profiles.entity';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { AUTH_SERVICE, USERS_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @Inject(USERS_SERVICE) private usersClient: ClientProxy,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
  ) {}

  async registration(dto: CreateProfileDto) {
    // Создание профиля
    const profileInsertResult = await this.profileRepository.insert(dto);
    const createdProfileId = profileInsertResult.raw[0].id;
    const profile = await this.profileRepository.findOneBy({
      id: createdProfileId,
    });

    // Создание учетных данных (User) для профиля
    const userCreateResult = await lastValueFrom(
      this.authClient.send('profile_created', { dto }),
    );
    const user = userCreateResult.User;
    profile.user = user;
    await this.profileRepository.save(profile);

    return profile;
  }

  async login(dto: CreateProfileDto) {
    return await lastValueFrom(this.authClient.send('profile_login', { dto }));
  }

  async getAllProfiles() {
    return await this.profileRepository.find({ relations: { user: true } });
  }

  async deleteProfile(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    const userId = profile.user?.id;
    const deleteResult = await this.profileRepository
      .createQueryBuilder()
      .delete()
      .from(Profile)
      .where('id = :id', { id })
      .returning('*')
      .execute();
    if (userId) {
      await lastValueFrom(this.usersClient.send('delete_user', { userId }));
    }

    return deleteResult;
  }

  async updateProfile(id: number, dto: CreateProfileDto) {
    try {
      // Изменение данных профиля
      await this.profileRepository
        .createQueryBuilder()
        .update()
        .set({
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone,
        })
        .where('id = :id', { id })
        .returning('*')
        .execute();
      const profile = await this.profileRepository.findOne({
        where: { id },
        relations: { user: true },
      });

      // Изменение учетных данных (User)
      const userId = profile.user.id;
      if (dto.login || dto.password || dto.email) {
        await lastValueFrom(
          this.usersClient.send('update_user', { userId, dto }),
        );
      }

      return await this.profileRepository.findOne({
        where: { id },
        relations: { user: true },
      });
    } catch (e) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  }
}
