import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { FILES_SERVICE } from './constants/services';
import { lastValueFrom } from 'rxjs';
import { TextBlock } from './texts.entity';
import { CreateTextDto } from './dto/create-text.dto';
import { FileDto } from '../../files/src/dto/file.dto';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(TextBlock)
    private textBlockRepository: Repository<TextBlock>,
    @Inject(FILES_SERVICE) private fileClient: ClientProxy,
  ) {}

  // Создание нового текстового блока
  async create(dto: CreateTextDto, image) {
    //TODO try/catch non-unique keys
    const textInsertResult = await this.textBlockRepository.insert(dto);
    const textBlockId = textInsertResult.raw[0].id;
    const fileDto: FileDto = {
      essenceTable: 'text_modules',
      essenceId: textBlockId,
    };
    await lastValueFrom(
      this.fileClient.send('create_file', { dto: fileDto, file: image }),
    );
    return await this.textBlockRepository.findOneBy({ id: textBlockId });
  }

  // Получение текстового блока по уникальному строковому идентификатору
  async get(uniqueString: string) {
    const textBlock = await this.textBlockRepository.findOneBy({
      uniqueStringId: uniqueString,
    });
    const textBlockId = textBlock.id;
    const fileDto: FileDto = {
      essenceTable: 'text_modules',
      essenceId: textBlockId,
    };
    const image = await lastValueFrom(
      this.fileClient.send('get_file', { dto: fileDto }),
    );
    return { textBlock: textBlock, image: image };
  }

  // Получение всех текстовых блоков
  async getAllTexts() {
    const texts = await this.textBlockRepository.find();
    for (const text of texts) {
      const fileDto: FileDto = {
        essenceTable: 'text_modules',
        essenceId: text.id,
      };
      text['image'] = await lastValueFrom(
        this.fileClient.send('get_file', { dto: fileDto }),
      );
    }
    return texts;
  }

  // Получение всех тестовых блоков из заданной группы
  async getAllTextsFromGroup(group: string) {
    const texts = await this.textBlockRepository.find({ where: { group } });
    for (const text of texts) {
      const fileDto: FileDto = {
        essenceTable: 'text_modules',
        essenceId: text.id,
      };
      text['image'] = await lastValueFrom(
        this.fileClient.send('get_file', { dto: fileDto }),
      );
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
        group: dto.group,
      })
      .where('uniqueStringId = :str', { str: dto.uniqueStringId })
      .returning('*')
      .execute();

    const fileDto: FileDto = {
      essenceTable: 'text_modules',
      essenceId: updateResult.raw[0].id,
    };
    if (image) {
      await lastValueFrom(
        this.fileClient.send('delete_file', { dto: fileDto }),
      );
      await lastValueFrom(
        this.fileClient.send('create_file', { dto: fileDto, file: image }),
      );
    }
    const currImage = await lastValueFrom(
      this.fileClient.send('get_file', { dto: fileDto }),
    );
    return { textBlock: updateResult.raw[0], image: currImage };
  }

  // Удаление текстового блока по уникальному строковому идентификатору
  async delete(stringId) {
    const deletionResult = await this.textBlockRepository
      .createQueryBuilder()
      .delete()
      .from(TextBlock)
      .where('uniqueStringId = :stringId', { stringId })
      .returning('*')
      .execute();
    const fileDto: FileDto = {
      essenceTable: 'text_modules',
      essenceId: deletionResult.raw[0].id,
    };
    await lastValueFrom(this.fileClient.send('delete_file', { dto: fileDto }));
    return deletionResult;
  }
}
