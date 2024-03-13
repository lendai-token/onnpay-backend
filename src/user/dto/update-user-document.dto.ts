import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateUserDocumentDto {
  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'Trade License Url',
  })
  @IsString()
  @MaxLength(255)
  tradeLicense: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'Emirates ID Url',
  })
  @IsString()
  @MaxLength(255)
  emiratesId: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'Passport',
  })
  @IsString()
  @MaxLength(255)
  passport: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'Visa',
  })
  @IsString()
  @MaxLength(255)
  visa: string;
}
