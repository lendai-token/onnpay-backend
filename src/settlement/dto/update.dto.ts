import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    example: 'approve',
    required: true,
    description: 'Status',
  })
  @IsString()
  status: string;
}

export class CompleteDto {
  @ApiProperty({
    example: 'document url',
    required: true,
    description: 'Document url',
  })
  @IsString()
  document: string;

  @ApiProperty({
    example: 'approve',
    required: true,
    description: 'Status',
  })
  @IsString()
  status: string;
}
