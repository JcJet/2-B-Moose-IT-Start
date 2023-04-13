import { Module } from '@nestjs/common';
import { Hw4Controller } from './hw4.controller';
import { Hw4Service } from './hw4.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { PROFILES_SERVCE, TEXTS_SERVICE } from './constants/services';
import { AuthModule } from '../../auth/src/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.apps/hw4/.env',
    }),
    AuthModule,
    RmqModule.register({
      name: PROFILES_SERVCE,
    }),
    RmqModule.register({
      name: TEXTS_SERVICE,
    }),
  ],
  controllers: [Hw4Controller],
  providers: [Hw4Service],
})
export class Hw4Module {}
