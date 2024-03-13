import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settlement')
export class Settlement {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({
    description: 'Date',
    required: true,
  })
  @Column({ type: 'varchar', nullable: false })
  date: string;

  @ApiProperty({ description: 'Request amount', maximum: 10, required: true })
  @Column({ type: 'numeric', nullable: false })
  amount: number;

  @ApiProperty({ description: 'Created email', maximum: 255, required: true })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  createdBy: string;

  @ApiProperty({ description: 'Payment status' })
  @Column({ type: 'varchar', nullable: false, default: 'request' })
  status: string;

  @ApiProperty({ description: 'Document URL' })
  @Column({ type: 'varchar', nullable: true })
  document: string;

  @ApiProperty({
    description: 'Date when the user was created',
    required: true,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when user was updated the last time',
    required: false,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
