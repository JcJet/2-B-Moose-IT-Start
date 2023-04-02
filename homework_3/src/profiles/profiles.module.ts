import {forwardRef, Module} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Profile} from "./profiles.entity";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import {User} from "../users/users.entity";

// Модуль для управления данными профиля

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  providers: [ProfilesService],
  controllers: [ProfilesController],
  exports: [ProfilesService]
})
export class ProfilesModule {}
