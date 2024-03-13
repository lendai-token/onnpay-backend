import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AuthRefreshToken } from '@src/auth-refresh-token/auth-refresh-token.entity';

@Entity('user')
export class User {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: `Unique uuid`, maximum: 36 })
  @Column({ type: 'varchar', nullable: false, length: 36 })
  uuid: string;

  @ApiProperty({ description: 'Full name', maximum: 128, required: false })
  @Column({ type: 'varchar', nullable: false, length: 128 })
  name: string;

  @ApiProperty({ description: 'E-mail', maximum: 255, required: true })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  email: string;

  @ApiProperty({ description: 'Password', maximum: 255, required: true })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  password: string;

  @ApiProperty({ description: 'Role', maximum: 20, required: true })
  @Column({ type: 'varchar', nullable: false, length: 20 })
  role: string;

  @ApiProperty({ description: 'Avatar', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  avatar: string;

  @ApiProperty({ description: 'Address', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  address: string;

  @ApiProperty({ description: 'City', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  city: string;

  @ApiProperty({ description: 'Country', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  country: string;

  @ApiProperty({ description: 'State', maximum: 30 })
  @Column({ type: 'varchar', nullable: true, length: 30 })
  state: string;

  @ApiProperty({ description: 'Zipcode', maximum: 30 })
  @Column({ type: 'varchar', nullable: true, length: 30 })
  zipcode: string;

  @ApiProperty({ description: 'Phone number', maximum: 30 })
  @Column({ type: 'varchar', nullable: true, length: 30 })
  phone: string;

  @ApiProperty({ description: 'Company Name', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  company: string;

  @ApiProperty({ description: 'Company Website', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  website: string;

  @ApiProperty({ description: 'Company No', maximum: 11 })
  @Column({ type: 'varchar', nullable: true, length: 11 })
  no: string;

  @ApiProperty({ description: 'VAT Id', maximum: 11 })
  @Column({ type: 'varchar', nullable: true, length: 11 })
  vatId: string;

  @ApiProperty({ description: 'Business Activity' })
  @Column({ type: 'text', nullable: true })
  activity: string;

  @ApiProperty({ description: 'Trade License Url', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  tradeLicense: string;

  @ApiProperty({ description: 'Emirated ID Url', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  emiratesId: string;

  @ApiProperty({ description: 'Passport Url', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  passport: string;

  @ApiProperty({ description: 'Visa Url', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  visa: string;

  @ApiProperty({ description: 'Account No', maximum: 11 })
  @Column({ type: 'varchar', nullable: true, length: 11 })
  accountNo: string;

  @ApiProperty({ description: 'IBAN', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  iban: string;

  @ApiProperty({ description: 'Swift Code', maximum: 30 })
  @Column({ type: 'varchar', nullable: true, length: 30 })
  swiftCode: string;

  @ApiProperty({ description: 'Bank Name', maximum: 255 })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  bank: string;

  @ApiProperty({ description: 'Commission Percentage', maximum: 2 })
  @Column({ type: 'numeric', nullable: true, default: 0 })
  commission: number;

  @ApiProperty({
    description: 'International Commission Percentage',
    maximum: 2,
  })
  @Column({ type: 'numeric', nullable: true, default: 0 })
  internationalCommission: number;

  @ApiProperty({ description: 'Withdrawal Charge', maximum: 2 })
  @Column({ type: 'numeric', nullable: true, default: 0 })
  withdrawal: number;

  @ApiProperty({ description: 'Other Charge', maximum: 2 })
  @Column({ type: 'numeric', nullable: true, default: 0 })
  other: number;

  @ApiProperty({ description: 'Is Delete' })
  @Column({ type: 'boolean', nullable: false, default: false })
  isDelete: boolean;

  @ApiProperty({ description: 'Activated' })
  @Column({ type: 'boolean', nullable: false, default: false })
  activated: boolean;

  @ApiProperty({ description: 'Profile allowed' })
  @Column({ type: 'boolean', nullable: false, default: false })
  isProfileAllowed: boolean;

  @ApiProperty({ description: 'Payment gateway allowed' })
  @Column({ type: 'boolean', nullable: false, default: false })
  isAllow: boolean;

  @ApiProperty({ description: 'API key', maximum: 20 })
  @Column({ type: 'varchar', nullable: true, length: 20 })
  apiKey: string;

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

  @OneToMany(
    () => AuthRefreshToken,
    (authRefreshToken) => authRefreshToken.user,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  refreshTokens: AuthRefreshToken[];
}
