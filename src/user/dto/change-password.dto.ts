import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { UserExistsByUuidValidator } from '../validator/user-exists-by-uuid.validator';

export class ChangePasswordDto {
  @Validate(UserExistsByUuidValidator)
  uuid: string;

  @ApiProperty({
    example: 'password123!@#',
    required: true,
    maximum: 255,
    description: 'Current Password',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  currentPassword: string;

  @ApiProperty({
    example: 'password345!@#',
    required: true,
    maximum: 255,
    description: 'New Password',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  newPassword: string;
}
