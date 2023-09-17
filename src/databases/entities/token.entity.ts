import { TokenType } from '@constants/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  token: string;

  @Column()
  type: TokenType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAT: Date;
}
