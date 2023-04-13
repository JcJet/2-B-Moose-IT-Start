import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { lastValueFrom } from 'rxjs';
import { USERS_SERVICE } from '../../profiles/src/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../../users/src/users.entity';
import { CreateUserDto } from '../../users/src/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private usersClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  // Вход в систему, возвращает токен
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  // Регистрация нового пользователя
  async registration(userDto: CreateUserDto) {
    const candidate = await lastValueFrom(
      this.usersClient.send('get_user_by_email', userDto.email),
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await lastValueFrom(
      this.usersClient.send('create_user', {
        ...userDto,
        password: hashPassword,
      }),
    );
    const token = await this.generateToken(user);
    return { User: user, Token: token };
  }

  // Генерация токена для авторизации
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await lastValueFrom(
      this.usersClient.send('get_user_by_email', userDto.email),
    );
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
