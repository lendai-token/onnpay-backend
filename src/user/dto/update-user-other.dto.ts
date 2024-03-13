import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, MaxLength } from 'class-validator';

export class UpdateUserOtherDto {
  @ApiProperty({
    example: 15,
    required: false,
    maximum: 2,
    description: 'Commission Percentage',
  })
  @IsNumber()
  commission: number;

  @ApiProperty({
    example: 15,
    required: false,
    maximum: 2,
    description: 'International Commission Percentage',
  })
  @IsNumber()
  internationalCommission: number;

  @ApiProperty({
    example: 15,
    required: false,
    maximum: 2,
    description: 'Withdrawal Charge',
  })
  @IsNumber()
  withdrawal: number;

  @ApiProperty({
    example: 15,
    required: false,
    maximum: 2,
    description: 'Other Charge',
  })
  @IsNumber()
  other: number;
}
