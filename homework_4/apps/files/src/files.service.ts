import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FileRecord } from './files.entity';
import { Repository } from 'typeorm';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileRecord)
    private fileRepository: Repository<FileRecord>,
  ) {}

  //Создание файла на диске и добавление записи в БД
  async createFile(file, dto: FileDto = new FileDto()): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const buffer: Buffer = Buffer.from(Array<number>(file.buffer.data));
      await fs.writeFile(path.join(filePath, fileName), buffer, (err) => {
        if (err) throw err;
      });

      await this.fileRepository.insert({ ...dto, fileName });
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Удаление неиспользуемых файлов (более часа с момента создания и не привязаны к сущности)
  async deleteUnused() {
    const deletionTime = new Date(Date.now() - 1000 * 60 * 60); // Час назад
    const deletionResult = await this.fileRepository
      .createQueryBuilder('files')
      .delete()
      .where('createdAt <= :deletionTime', { deletionTime })
      .andWhere('essenceTable IS NULL')
      .andWhere('essenceId IS NULL')
      .returning('*')
      .execute();

    const filePath = path.resolve(__dirname, '..', 'static');
    for (const row of deletionResult.raw) {
      try {
        fs.rm(path.join(filePath, row.fileName), () => {});
      } catch (e) {
        throw new HttpException(
          'Произошла ошибка при удалении файла',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  // Получение имени файла по информации essenceTable, essenceId
  async getFile(dto: FileDto) {
    const fileRecord = await this.fileRepository
      .createQueryBuilder('files')
      .where('files.essenceTable = :table', { table: dto.essenceTable })
      .andWhere('files.essenceId = :id', { id: dto.essenceId })
      .getOne();
    return fileRecord ? fileRecord.fileName : undefined;
  }

  // Удаление файла с диска и записи из БД
  async deleteFile(dto: FileDto, fromDisk = false) {
    const deletionResult = await this.fileRepository
      .createQueryBuilder()
      .delete()
      .from(FileRecord)
      .where('essenceTable = :table', { table: dto.essenceTable })
      .andWhere('essenceId = :id', { id: dto.essenceId })
      .returning('*')
      .execute();
    if (fromDisk) {
      const filePath = path.resolve(__dirname, '..', 'static');
      const fileName = deletionResult.raw[0].fileName;
      try {
        fs.rm(path.join(filePath, fileName), () => {});
      } catch (e) {
        throw new HttpException(
          'Произошла ошибка при удалении файла',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
