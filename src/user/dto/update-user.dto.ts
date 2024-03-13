import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { UserExistsByUuidValidator } from '../validator/user-exists-by-uuid.validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    required: false,
    minimum: 1,
    maximum: 128,
    description: 'Full name',
  })
  @ValidateIf((o) => (!o?.email && !o?.phoneNumber) || o?.name)
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    required: false,
    maximum: 255,
    description: 'E-mail',
  })
  @ValidateIf((o) => (!o?.name && !o?.phoneNumber) || o?.email)
  @IsEmail()
  @MaxLength(255)
  email: string;

  @Validate(UserExistsByUuidValidator)
  uuid: string;

  @ApiProperty({
    example: 'user',
    required: false,
    maximum: 20,
    description: 'User role',
  })
  @ValidateIf((o) => (!o?.name && !o?.phoneNumber) || o?.email)
  @IsString()
  @MaxLength(20)
  role: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'Avatar',
  })
  @ValidateIf((o) => (!o?.name && !o?.phoneNumber) || o?.email)
  @IsString()
  @MaxLength(255)
  avatar: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'Address',
  })
  @ValidateIf((o) => (!o?.name && !o?.phoneNumber) || o?.email)
  @IsString()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'City',
  })
  @ValidateIf((o) => (!o?.name && !o?.phoneNumber) || o?.email)
  @IsString()
  @MaxLength(255)
  city: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 255,
    description: 'Country',
  })
  @ValidateIf((o) => (!o?.name && !o?.phoneNumber) || o?.email)
  @IsString()
  @MaxLength(255)
  country: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 30,
    description: 'State',
  })
  @ValidateIf((o) => (!o?.name && !o?.phoneNumber) || o?.email)
  @IsString()
  @MaxLength(30)
  state: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 30,
    description: 'Zipcode',
  })
  @ValidateIf((o) => (!o?.name && !o?.phoneNumber) || o?.email)
  @IsString()
  @MaxLength(30)
  zipcode: string;

  @ApiProperty({
    example: '',
    required: false,
    maximum: 30,
    description: 'Phone',
  })
  @ValidateIf((o) => (!o?.name && !o?.phoneNumber) || o?.email)
  @IsString()
  @MaxLength(30)
  phone: string;
}
