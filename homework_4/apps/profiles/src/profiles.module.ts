import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { AUTH_SERVICE, USERS_SERVICE } from './constants/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profiles.entity';
import { User } from '../../users/src/users.entity';
import { Role } from '../../users/src/roles/roles.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD.toString(),
      database: process.env.POSTGRES_DB,
      entities: [Profile, User, Role],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Profile, User, Role]),
    RmqModule.register({
      name: USERS_SERVICE,
    }),
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
    RmqModule,
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
