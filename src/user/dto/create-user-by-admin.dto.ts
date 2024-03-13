import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UserExistsByEmailValidator } from '../validator/user-exists-by-email.validator';

export class CreateUserByAdminDto {
  @ApiProperty({
    example: 'John Doe',
    required: true,
    minimum: 1,
    maximum: 128,
    description: 'Full name',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    required: true,
    maximum: 255,
    description: 'E-mail',
  })
  @IsEmail()
  @MaxLength(255)
  @Validate(UserExistsByEmailValidator)
  email: string;

  @ApiProperty({
    example: 'password123!@#',
    required: true,
    maximum: 255,
    description: 'Password',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  @ApiProperty({
    example: 'Payd',
    required: true,
    minimum: 1,
    maximum: 255,
    description: 'Company Name',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  company: string;

  @ApiProperty({
    example: 'https://www.payd.ae/',
    required: false,
    minimum: 1,
    maximum: 255,
    description: 'Company Website',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  website: string;

  @ApiProperty({
    example: '1',
    required: true,
    minimum: 1,
    maximum: 11,
    description: 'Company No',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(11)
  no: string;

  @ApiProperty({
    example: 'Business Activity',
    required: true,
    description: 'Business Activity',
  })
  @IsString()
  activity: string;

  @ApiProperty({
    example: 'United Arab Emirates',
    required: true,
    minimum: 1,
    maximum: 255,
    description: 'Country',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  country: string;

  @ApiProperty({
    example: 'Dubai',
    required: true,
    minimum: 1,
    maximum: 255,
    description: 'City',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  city: string;

  @ApiProperty({
    example: 'Box No. 215915',
    required: true,
    minimum: 1,
    maximum: 255,
    description: 'Address',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  address: string;

  @ApiProperty({
    example: '1234567890',
    required: true,
    minimum: 1,
    maximum: 30,
    description: 'Phone Number',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  phone: string;

  @ApiProperty({
    example: '1234',
    required: true,
    minimum: 1,
    maximum: 11,
    description: 'VAT Id',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(11)
  vatId: string;

  @ApiProperty({
    example: 'user',
    required: true,
    maximum: 20,
    description: 'Role',
  })
  @IsString()
  @MaxLength(20)
  role: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'Company Logo',
  })
  @IsString()
  @MaxLength(255)
  avatar: string;

  @ApiProperty({
    example: false,
    required: true,
    description: 'User activated',
  })
  @IsBoolean()
  activated: boolean;
}
