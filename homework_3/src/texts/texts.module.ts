import {forwardRef, Module} from '@nestjs/common';
import { TextsController } from './texts.controller';
import { TextsService } from './texts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.entity";
import {TextBlock} from "./texts.entity";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

// Модуль для работы с текстовыми блоками

@Module({
  controllers: [TextsController],
  providers: [TextsService],
  imports: [
      TypeOrmModule.forFeature([TextBlock, User]),
      FilesModule,
      forwardRef(() => AuthModule)],

})
export class TextsModule {}
