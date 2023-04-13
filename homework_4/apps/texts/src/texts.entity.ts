import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`text_modules`)
export class TextBlock {
  @PrimaryGeneratedColumn()
  id: number;

  // Уникальное название для поиска (например, main-hero-text)
  @Column({ type: 'varchar', unique: true })
  uniqueStringId: string;

  // Название
  @Column({ type: 'varchar', length: 255 })
  title: string;

  // Текст
  @Column({ type: 'varchar', length: 254, nullable: true })
  content: string;

  // Группа.
  // (например, main-page - чтобы все блоки главной страницы или другой группы фронтэнд мог получать одним запросом)
  @Column({ type: 'varchar' })
  group: string;
}
