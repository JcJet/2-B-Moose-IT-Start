import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {TextsModule} from "../texts/texts.module";

// Модуль авторизации и проверки доступа

@Module({
  providers: [AuthService],
  imports: [
      forwardRef(() => UsersModule),
      forwardRef(() => TextsModule),

      JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
          expiresIn: '24h'
        }
      })
  ],
  exports: [
        AuthService,
        JwtModule
  ]
})
export class AuthModule {}
