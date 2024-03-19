import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

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

  @ApiProperty({
    example: "aQ1dju7hdsjweuH3i",
    required: false,
    maximum: 255,
    description: 'Access Code',
  })
  @IsString()
  accessCode: string;

  @ApiProperty({
    example: "3328ty26",
    required: false,
    maximum: 255,
    description: 'Merchant Identifier',
  })
  @IsString()
  merchantId: string;

  @ApiProperty({
    example: "89pUIkd9y56gGjQNyzbz3A!&",
    required: false,
    maximum: 255,
    description: 'SHA Request',
  })
  @IsString()
  shaRequest: string;
}
