import { ApiResponseProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id?: string;

  @ApiResponseProperty()
  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;
}
