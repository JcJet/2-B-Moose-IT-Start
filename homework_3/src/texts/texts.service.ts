import {Injectable} from '@nestjs/common';
import {CreateTextDto} from "./dto/create-text.dto";
import {TextBlock} from "./texts.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FilesService} from "../files/files.service";
import {FileDto} from "../files/dto/file.dto";

@Injectable()
export class TextsService {

    constructor(
        @InjectRepository(TextBlock)
        private textBlockRepository: Repository<TextBlock>,
        private fileService: FilesService) {}

    // Создание нового текстового блока
    async create(dto: CreateTextDto, image) {
        //TODO try/catch non-unique keys
        const textInsertResult = await this.textBlockRepository.insert(dto);
        const textBlockId = textInsertResult.raw[0].id
        const fileDto: FileDto = {essenceTable: 'text_modules', essenceId: textBlockId};
        await this.fileService.createFile(image, fileDto);
        return await this.textBlockRepository.findOneBy({id: textBlockId});

    }

    // Получение текстового блока по уникальному строковому идентификатору
    async get(uniqueString: string) {
        const textBlock = await this.textBlockRepository.findOneBy({uniqueStringId: uniqueString});
        const textBlockId = textBlock.id
        const fileDto: FileDto = {essenceTable: 'text_modules', essenceId: textBlockId};
        const image = await this.fileService.getFile(fileDto);
        return {"textBlock": textBlock, "image": image};
    }

    // Получение всех текстовых блоков
    async getAllTexts() {
        const texts = await this.textBlockRepository.find();
        for (let text of texts) {
            const fileDto: FileDto = {essenceTable: 'text_modules', essenceId: text.id};
            text['image'] = await this.fileService.getFile(fileDto);
        }
        return texts;
    }

    // Получение всех тестовых блоков из заданной группы
    async getAllTextsFromGroup(group: string) {
        const texts = await this.textBlockRepository.find({where: {group}});
        for (let text of texts) {
            const fileDto: FileDto = {essenceTable: 'text_modules', essenceId: text.id};
            text['image'] = await this.fileService.getFile(fileDto);
        }
        return texts;
    }

    // Изменение текстового блока
    async update(dto: CreateTextDto, image = undefined) {
        const updateResult = await this.textBlockRepository
            .createQueryBuilder()
            .update()
            .set({
                title: dto.title,
                content: dto.content,
                group: dto.group
            })
            .where('uniqueStringId = :str', {str: dto.uniqueStringId})
            .returning('*')
            .execute();

        const fileDto: FileDto = {essenceTable: 'text_modules', essenceId: updateResult.raw[0].id}
        if (image) {
            await this.fileService.deleteFile(fileDto);
            await this.fileService.createFile(image,fileDto);
        }
        const currImage = await this.fileService.getFile(fileDto);
        return {"textBlock": updateResult.raw[0], "image": currImage}
    }

    // Удаление текстового блока по уникальному строковому идентификатору
    async delete(stringId) {
        const deletionResult = await this.textBlockRepository
            .createQueryBuilder()
            .delete()
            .from(TextBlock)
            .where('uniqueStringId = :stringId', {stringId})
            .returning('*')
            .execute();
        const fileDto: FileDto = {essenceTable: 'text_modules', essenceId: deletionResult.raw[0].id}
        await this.fileService.deleteFile(fileDto);
        return deletionResult;
    }



}
