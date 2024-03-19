import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PaymentDto {
  @ApiProperty({
    example: 'PURCHASE',
    required: true,
    maximum: 20,
    description: 'Command',
  })
  @IsString()
  @MaxLength(20)
  command: string;

  @ApiProperty({
    example: 'ORDER-202304080500',
    required: true,
    maximum: 40,
    description: 'Merchant Reference',
  })
  @IsString()
  @MaxLength(40)
  merchantReference: string;

  @ApiProperty({
    example: 10000,
    required: true,
    maximum: 10,
    description: 'Transaction amount',
  })
  @IsNumber()
  //   @MaxLength(10)
  amount: number;

  @ApiProperty({
    example: 'AED',
    required: true,
    maximum: 3,
    description: 'Currency',
  })
  @IsString()
  @MaxLength(3)
  currency: string;

  @ApiProperty({
    example: 'en',
    required: true,
    maximum: 2,
    description: 'Language',
  })
  @IsString()
  @MaxLength(2)
  language: string;

  @ApiProperty({
    example: 'ahmed@payd.ae',
    required: true,
    maximum: 255,
    description: 'Customer Email',
  })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: '0c225a7a4dd34a10a428cda3f0280eb3',
    required: true,
    maximum: 100,
    description: 'Token name',
  })
  @IsString()
  @MaxLength(100)
  tokenName: string;

  @ApiProperty({
    example: 123,
    required: true,
    maximum: 4,
    description: 'Card Security Code',
  })
  @IsNumber()
  // @MaxLength(100)
  cardSecurityCode: number;

  @ApiProperty({
    example: 'iPhone 6-S',
    required: false,
    maximum: 150,
    description: 'Order Description',
  })
  @IsString()
  @MaxLength(150)
  orderDescription: string;

  @ApiProperty({
    example: 'Ahmed Aideed',
    required: false,
    maximum: 40,
    description: 'Customer Name',
  })
  @IsString()
  @MaxLength(40)
  name: string;

  @ApiProperty({
    example: 971564969040,
    required: false,
    maximum: 19,
    description: 'Customer Phone',
  })
  @IsString()
  // @MaxLength(19)
  phone: string;

  @ApiProperty({
    example: 'https://dashboard.onnpay.com/dashboard/transaction',
    required: false,
    maximum: 400,
    description: 'Return Url',
  })
  @IsString()
  @MaxLength(400)
  returnUrl: string;

  @ApiProperty({
    example: '1',
    required: true,
    description: 'User ID',
  })
  @IsNumber()
  userid: number;
}

export class InvoiceDto {
  @ApiProperty({
    example: 'PAYMENT_LINK',
    required: true,
    maximum: 20,
    description: 'Service Command',
  })
  @IsString()
  @MaxLength(20)
  serviceCommand: string;

  @ApiProperty({
    example: 'ORDER-202304110008',
    required: true,
    maximum: 40,
    description: 'Merchant Reference',
  })
  @IsString()
  @MaxLength(40)
  merchantReference: string;

  @ApiProperty({
    example: 10000,
    required: true,
    maximum: 10,
    description: 'Transaction amount',
  })
  @IsNumber()
  //   @MaxLength(10)
  amount: number;

  @ApiProperty({
    example: 'AED',
    required: true,
    maximum: 3,
    description: 'Currency',
  })
  @IsString()
  @MaxLength(3)
  currency: string;

  @ApiProperty({
    example: 'en',
    required: true,
    maximum: 2,
    description: 'Language',
  })
  @IsString()
  @MaxLength(2)
  language: string;

  @ApiProperty({
    example: 'ahmed@payd.ae',
    required: true,
    maximum: 255,
    description: 'Customer Email',
  })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: '2023-12-20T15:36:55+03:00',
    required: true,
    maximum: 25,
    description: 'Request Expiry Date',
  })
  @IsString()
  @MaxLength(25)
  expiryDate: string;

  @ApiProperty({
    example: 'PURCHASE',
    required: false,
    maximum: 15,
    description: 'Link Command',
  })
  @IsString()
  @MaxLength(15)
  linkCommand: string;

  @ApiProperty({
    example: 'EMAIL',
    required: true,
    maximum: 20,
    description: 'Notification Type',
  })
  @IsString()
  @MaxLength(20)
  notification: string;

  @ApiProperty({
    example: 'INV-001',
    required: false,
    maximum: 20,
    description: 'Invoice Number',
  })
  @IsString()
  @MaxLength(20)
  invoiceNo: string;

  @ApiProperty({
    example: 'iPhone 6-S',
    required: false,
    maximum: 150,
    description: 'Order Description',
  })
  @IsString()
  @MaxLength(150)
  orderDescription: string;

  @ApiProperty({
    example: 'Ahmed Aideed',
    required: false,
    maximum: 40,
    description: 'Customer Name',
  })
  @IsString()
  @MaxLength(40)
  name: string;

  @ApiProperty({
    example: 971564969040,
    required: false,
    maximum: 19,
    description: 'Customer Phone',
  })
  @IsString()
  // @MaxLength(19)
  phone: string;

  // @ApiProperty({
  //   example: 'https://dashboard.onnpay.com/dashboard/transaction',
  //   required: false,
  //   maximum: 400,
  //   description: 'Return Url',
  // })
  // @IsString()
  // @MaxLength(400)
  // returnUrl: string;

  @ApiProperty({
    example: 'adam@onnpay.com',
    required: false,
    maximum: 255,
    description: 'Created by email',
  })
  @IsString()
  @MaxLength(255)
  createdBy: string;

  @ApiProperty({
    example: '1',
    required: true,
    description: 'User ID',
  })
  @IsNumber()
  userid: number;
}

export class CheckStatusDto {
  @ApiProperty({
    example: 'CHECK_STATUS',
    required: true,
    maximum: 50,
    description: 'Query Command',
  })
  @IsString()
  @MaxLength(50)
  queryCommand: string;

  @ApiProperty({
    example: 'ORDER-202304110008',
    required: true,
    maximum: 40,
    description: 'Merchant Reference',
  })
  @IsString()
  @MaxLength(40)
  merchantReference: string;

  @ApiProperty({
    example: 'en',
    required: true,
    maximum: 2,
    description: 'Language',
  })
  @IsString()
  @MaxLength(2)
  language: string;
}
