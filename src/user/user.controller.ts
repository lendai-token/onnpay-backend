import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseHelper } from '@src/common/helpers/api-response.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UpdateUserDocumentDto } from './dto/update-user-document.dto';
import { UpdateUserBankDto } from './dto/update-user-bank.dto';
import { UpdateUserOtherDto } from './dto/update-user-other.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: `Register a new user` })
  @ApiResponse(ApiResponseHelper.success(User, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Post('auth/register')
  async register(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @ApiOperation({ description: `Get all user info` })
  @ApiResponse(ApiResponseHelper.success(User, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Get('user')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ description: `Get an user info` })
  @ApiResponse(ApiResponseHelper.success(User, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Get('user/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ description: `Get total number of user active` })
  @Get('get_active_user_count/')
  async getCountActive(): Promise<number> {
    return this.userService.getCountActive();
  }

  @ApiOperation({ description: `Update an user info` })
  @ApiResponse(ApiResponseHelper.success(User, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Patch('user/:id')
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    const updatedBlog = await this.userService.update(id, updateUser);
    return updatedBlog;
  }

  @ApiOperation({ description: `Update an user info` })
  @ApiResponse(ApiResponseHelper.success(User, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Patch('user_edit/:id')
  async edit(@Param('id') id: number, @Body() editUser: EditUserDto) {
    const updatedBlog = await this.userService.edit(id, editUser);
    return updatedBlog;
  }

  @ApiOperation({ description: `Update an user documents info` })
  @ApiResponse(ApiResponseHelper.success(User, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Patch('user/update_document/:id')
  async updateDocument(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDocumentDto,
  ) {
    const updatedBlog = await this.userService.updateDocument(id, updateUser);
    return updatedBlog;
  }

  @ApiOperation({ description: `Update an user bank info` })
  @ApiResponse(ApiResponseHelper.success(User, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Patch('user/update_bank/:id')
  async updateBank(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserBankDto,
  ) {
    const updatedBlog = await this.userService.updateBank(id, updateUser);
    return updatedBlog;
  }

  @ApiOperation({ description: `Update an user other info` })
  @ApiResponse(ApiResponseHelper.success(User, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Patch('user/update_other/:id')
  async updateOther(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserOtherDto,
  ) {
    const updatedBlog = await this.userService.updateOther(id, updateUser);
    return updatedBlog;
  }

  @ApiOperation({ description: `Change user's password` })
  @ApiResponse(
    ApiResponseHelper.success(
      'Password updated successfully.',
      HttpStatus.CREATED,
    ),
  )
  @ApiResponse(ApiResponseHelper.notFound('User not found.'))
  @Patch('user/:id/change_password')
  async changePassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.userService.changePassword(id, changePasswordDto);
  }

  @Post('user/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.userService.uploadFile(file);
    return { url: fileUrl };
  }

  @Post('user/upload_logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogoFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.userService.uploadLogo(file);
    return { url: fileUrl };
  }

  @Post('user/upload_document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.userService.uploadDocument(file);
    return { url: fileUrl };
  }

  @ApiOperation({ description: `Create a new user by admin` })
  @ApiResponse(ApiResponseHelper.success(User, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Post('user/create')
  async createUser(@Body() body: CreateUserByAdminDto) {
    return this.userService.createUser(body);
  }
}
