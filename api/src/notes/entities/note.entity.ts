import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

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
