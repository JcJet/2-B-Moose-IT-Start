import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.entity";
import { DataSource } from 'typeorm';
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.entity";
import { AuthModule } from './auth/auth.module';
import { TextsModule } from './texts/texts.module';
import { TextBlock } from "./texts/texts.entity";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ProfilesModule } from './profiles/profiles.module';
import * as path from 'path';
import {Profile} from "./profiles/profiles.entity";
import {FileRecord} from "./files/files.entity";

@Module({
  controllers: [],
  providers: [],
  imports: [
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static')
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD.toString(),
        database: process.env.POSTGRES_DB,
        entities: [User, Role, TextBlock, Profile, FileRecord],
        synchronize: true,
      }),
      UsersModule,
      RolesModule,
      AuthModule,
      TextsModule,
      FilesModule,
      ProfilesModule,
  ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
