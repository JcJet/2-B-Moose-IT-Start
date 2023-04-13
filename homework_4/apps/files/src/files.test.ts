import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMTestingModule } from './test-utils/TypeORMTestingModule';
import { FileRecord } from './files.entity';
import { FilesService } from './files.service';
import { FileDto } from './dto/file.dto';

describe('FilesService', () => {
  let service = null;
  beforeAll(() => {});
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMTestingModule([FileRecord]),
        TypeOrmModule.forFeature([FileRecord]),
      ],
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });
  it('should create new file', async () => {
    const dto: FileDto = {
      essenceTable: 'test',
      essenceId: 1,
    };
    const file: any = new Object();
    file['buffer'] = Buffer.from([1, 2, 3]);

    const createFileResult = await service.createFile(file, dto);
    expect(typeof createFileResult).toBe('string');
  });

  it('should get the file', async () => {
    const dto: FileDto = {
      essenceTable: 'test2',
      essenceId: 1,
    };
    const file: any = new Object();
    file['buffer'] = Buffer.from([1, 2, 3]);

    await service.createFile(file, dto);
    const getFileResult = await service.getFile(dto);
    expect(typeof getFileResult).toBe('string');
  });

  it('should delete the file', async () => {
    const dto: FileDto = {
      essenceTable: 'test3',
      essenceId: 1,
    };
    const file: any = new Object();
    file['buffer'] = Buffer.from([1, 2, 3]);

    await service.createFile(file, dto);
    let getFileResult = await service.getFile(dto);
    expect(typeof getFileResult).toBe('string');

    await service.deleteFile(dto);
    getFileResult = await service.getFile(dto);
    expect(getFileResult).toBeUndefined();
  });

  it('should delete unused files', async () => {
    await service.deleteUnused();

    const deletionTime = new Date(Date.now() - 1000 * 60 * 60); // Час назад
    const getFilesResult = await service.fileRepository
      .createQueryBuilder('files')
      .where('files.createdAt <= :deletionTime', { deletionTime })
      .andWhere('files.essenceTable IS NULL')
      .andWhere('files.essenceId IS NULL')
      .getMany();

    expect(getFilesResult).toEqual([]);
  });

  afterAll(async () => {
    const createdFiles = ['test', 'test2', 'test3'];
    for (const table of createdFiles) {
      const dto: FileDto = {
        essenceTable: table,
        essenceId: 1,
      };
      await service.deleteFile(dto);
    }
  });
});
