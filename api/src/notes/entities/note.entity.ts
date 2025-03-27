import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @Column()
  @CreateDateColumn()
  created_at: string;

  @Column()
  @UpdateDateColumn()
  updated_at: string;

  @Column()
  @DeleteDateColumn()
  deleted_at: string;
}
