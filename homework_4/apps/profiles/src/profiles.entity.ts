import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/src/users.entity';

@Entity(`profiles`)
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
