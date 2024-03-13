import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SettlementDto {
  @ApiProperty({
    example: '2023-06-08',
    required: true,
    description: 'Request date',
  })
  @IsString()
  date: string;

  @ApiProperty({
    example: 100,
    required: true,
    description: 'Request amount',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'adam@onnpay.com',
    required: true,
    maximum: 255,
    description: 'Created Email',
  })
  @IsEmail()
  @MaxLength(255)
  createdBy: string;

  @ApiProperty({
    example: 'request',
    required: true,
    description: 'Status',
  })
  @IsString()
  status: string;
}
