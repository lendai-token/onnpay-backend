import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateUserBankDto {
  @ApiProperty({
    example: '',
    required: false,
    maximum: 11,
    description: 'Account No',
  })
  @IsString()
  @MaxLength(11)
  accountNo: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'IBAN',
  })
  @IsString()
  @MaxLength(255)
  iban: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 30,
    description: 'Swift Code',
  })
  @IsString()
  @MaxLength(30)
  swiftCode: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'Bank Name',
  })
  @IsString()
  @MaxLength(255)
  bank: string;
}
