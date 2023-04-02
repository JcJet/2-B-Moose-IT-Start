import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {CreateProfileDto} from "../profiles/dto/create-profile.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private rolesService: RolesService,
    ) {}

    // Создание нового пользователя
    async createUser(dto: CreateUserDto) {
        const userInsertResult = await this.usersRepository.insert(dto);
        const role = await this.rolesService.getRoleByValue('USER');
        const createdUserId = userInsertResult.raw[0].id;
        const user = await this.usersRepository.findOneBy({id: createdUserId})
        user.roles = [role]
        await this.usersRepository.save(user)
        return user;
    }

    // Получение всех пользователей
    async getAllUsers() {
        return await this.usersRepository.find({relations: {roles: true}});
    }

    // Получение пользователя по email
    async getUserByEmail(email: string) {
        return await this.usersRepository.findOne({where: {email}, relations: {roles: true}});
    }

    // Добавление роли пользователя
    async addRole(dto: AddRoleDto) {
        const user = await this.usersRepository.findOneBy({id: dto.userId});
        const role = await this.rolesService.getRoleByValue(dto.value);
        if (role && user) {
            // TODO: user roles - добавить, не заменить
            user.roles = [role];
            await this.usersRepository.save(user);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    // Заблокировать пользователя
    async ban(dto: BanUserDto) {
        const user = await this.usersRepository.findOneBy({id: dto.userId});
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.banned = true;
        user.bannedReason = dto.banReason;
        await this.usersRepository.save(user);
        return user;
    }

    // Изменение данных пользователя
    async updateUser(userId: number, dto: CreateProfileDto) {
        await this.usersRepository.createQueryBuilder()
            .update()
            .set({
                login: dto.login,
                password: dto.password,
                email: dto.email
            })
            .where({id: userId})
            .execute()
    }

    // Удаление пользователя по id
    async deleteUser(userId: number) {
        return await this.usersRepository.createQueryBuilder()
            .createQueryBuilder()
            .delete()
            .from(User)
            .where('id = :id', { id: userId })
            .returning('*')
            .execute();
    }

}
