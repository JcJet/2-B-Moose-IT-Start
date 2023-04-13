import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(`files`)
export class FileRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  fileName: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  essenceTable: string;

  @Column({ type: 'integer', nullable: true })
  essenceId: number;
}
