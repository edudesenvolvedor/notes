import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecoveryToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column()
  @CreateDateColumn()
  created_at: string;

  @Column()
  validate_token: string;
}
