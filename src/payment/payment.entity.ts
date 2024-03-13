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

@Entity('payment')
export class Payment {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  // @ApiProperty({ description: `Unique uuid`, maximum: 36 })
  // @Column({ type: 'varchar', nullable: false, length: 36 })
  // uuid: string;

  @ApiProperty({
    description: 'Invoice Number',
    maximum: 20,
    required: true,
  })
  @Column({ type: 'varchar', nullable: false, length: 20 })
  invoiceNo: string;

  @ApiProperty({
    description: 'Merchant Reference',
    maximum: 40,
    required: true,
  })
  @Column({ type: 'varchar', nullable: false, length: 40 })
  merchantReference: string;

  @ApiProperty({ description: 'Amount', maximum: 10, required: true })
  @Column({ type: 'numeric', nullable: false })
  amount: number;

  @ApiProperty({ description: 'Currency', maximum: 3, required: true })
  @Column({ type: 'varchar', nullable: false, length: 3 })
  currency: string;

  @ApiProperty({ description: 'Language', maximum: 2, required: true })
  @Column({ type: 'varchar', nullable: false, length: 2 })
  language: string;

  @ApiProperty({ description: 'Customer Email', maximum: 255, required: true })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  email: string;

  @ApiProperty({
    description: 'Request Expiry Date',
    maximum: 25,
    required: true,
  })
  @Column({ type: 'varchar', nullable: false, length: 25 })
  expiryDate: string;

  @ApiProperty({
    description: 'Notification Type',
    maximum: 20,
    required: true,
  })
  @Column({ type: 'varchar', nullable: false, length: 20 })
  notification: string;

  @ApiProperty({
    description: 'Order Description',
    maximum: 150,
    required: false,
  })
  @Column({ type: 'varchar', nullable: true, length: 150 })
  orderDescription: string;

  @ApiProperty({ description: 'Customer Name', maximum: 40, required: false })
  @Column({ type: 'varchar', nullable: true, length: 40 })
  name: string;

  @ApiProperty({ description: 'Customer Phone', maximum: 19, required: false })
  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @ApiProperty({ description: 'Payment link', maximum: 255, required: true })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  paymentLink: string;

  @ApiProperty({ description: 'Created email', maximum: 255, required: true })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  createdBy: string;

  @ApiProperty({ description: 'Visits count', maximum: 9, required: false })
  @Column({ type: 'numeric', nullable: true, default: 0 })
  visits: number;

  @ApiProperty({ description: 'Payment status' })
  @Column({ type: 'varchar', nullable: false, default: 'Pending' })
  status: string;

  @ApiProperty({ description: 'Is Delete' })
  @Column({ type: 'varchar', nullable: false, default: false })
  isDelete: boolean;

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
