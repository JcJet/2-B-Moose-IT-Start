import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'User1', description: 'Логин пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly login: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Адрес электронной почты',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 255, { message: 'Не меньше 4 и не больше 255' })
  readonly password: string;
}
