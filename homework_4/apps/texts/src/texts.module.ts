import { Module } from '@nestjs/common';
import { TextsController } from './texts.controller';
import { TextsService } from './texts.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextBlock } from './texts.entity';
import { RmqModule } from '@app/common';
import { FILES_SERVICE } from './constants/services';

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
      entities: [TextBlock],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TextBlock]),
    RmqModule,
    RmqModule.register({
      name: FILES_SERVICE,
    }),
  ],
  controllers: [TextsController],
  providers: [TextsService],
})
export class TextsModule {}
