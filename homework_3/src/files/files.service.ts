import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import {InjectRepository} from "@nestjs/typeorm";
import {FileRecord} from "./files.entity";
import {Repository} from "typeorm";
import {FileDto} from "./dto/file.dto";
@Injectable()
export class FilesService {

    constructor(
        @InjectRepository(FileRecord)
        private fileRepository: Repository<FileRecord>
    ) {}

    //Создание файла на диске и добавление записи в БД
    async createFile(file, dto: FileDto = new FileDto()): Promise<string> {
        try {
            // TODO: имеет смысл переписать в асинхронный вариант
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)


            await this.fileRepository.insert({...dto, fileName});
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Удаление неиспользуемых файлов (более часа с момента создания и не привязаны к сущности)
    async deleteUnused() {
        const deletionTime = Date.now() - 1000 * 60 * 60 // Час назад
        const deletionResult = await this.fileRepository.createQueryBuilder()
            .delete()
            .from(FileRecord)
            .where('files.createdAt <= :deletionTime', {deletionTime})
            .andWhere('files.essenceTable = null')
            .andWhere('files.essenceId = null')
            .returning('*')
            .execute();

        const filePath = path.resolve(__dirname, '..', 'static')
        for (let row of deletionResult.raw) {
            try {
                fs.rm(path.join(filePath, row.fileName), () => {});
            } catch (e) {
                throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    // Получение имени файла по информации essenceTable, essenceId
    async getFile(dto: FileDto) {
        const fileRecord = await this.fileRepository.createQueryBuilder('files')
            .where('files.essenceTable = :table', {table: dto.essenceTable})
            .andWhere('files.essenceId = :id', {id: dto.essenceId})
            .getOne();
        return fileRecord ? fileRecord.fileName : undefined;
    }

    // Удаление файла с диска и записи из БД
    async deleteFile(dto: FileDto, fromDisk: boolean = false) {
        const deletionResult = await this.fileRepository
            .createQueryBuilder()
            .delete()
            .from(FileRecord)
            .where('essenceTable = :table', {table: dto.essenceTable})
            .andWhere('essenceId = :id', {id: dto.essenceId})
            .returning('*')
            .execute()
        if (fromDisk) {
            const filePath = path.resolve(__dirname, '..', 'static')
            const fileName = deletionResult.raw[0].fileName;
            try {
                fs.rm(path.join(filePath, fileName), () => {});
            } catch (e) {
                throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }
}
