import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileRecord} from "./files.entity";

// Модуль для работы с файлами

@Module({
  imports: [TypeOrmModule.forFeature([FileRecord])],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
