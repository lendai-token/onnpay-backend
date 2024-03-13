import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenInterface } from '../auth/auth.type';
import * as bcrypt from 'bcrypt';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UpdateUserDocumentDto } from './dto/update-user-document.dto';
import { UpdateUserBankDto } from './dto/update-user-bank.dto';
import { UpdateUserOtherDto } from './dto/update-user-other.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  private s3: AWS.S3;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    this.s3 = new AWS.S3({
      // use your own configuration here
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  private readonly logger = new Logger(UserService.name);

  async findByUuid(uuid: string): Promise<User> {
    return this.userRepository.findOne({ where: { uuid, activated: true } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email, activated: true } });
  }

  async findByApiKey(apiKey: string): Promise<User> {
    return this.userRepository.findOne({
      where: { apiKey, activated: true, isAllow: true },
    });
  }

  async getCountActive(): Promise<number> {
    return this.userRepository.getCountActive();
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (user) {
      await this.userRepository.update(
        { id },
        this.userRepository.create(body),
      );
      this.logger.log(`Update ${id} User`);
    }

    return this.findOne(id);
  }

  async edit(id: number, body: EditUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (body.isAllow && !user.apiKey) {
      const apiKey = this.generateRandomString(20);
      body.apiKey = apiKey;
    }

    if (user) {
      await this.userRepository.update(
        { id },
        this.userRepository.create(body),
      );
      this.logger.log(`Edit ${id} User`);
    }

    return this.findOne(id);
  }

  async updateDocument(id: number, body: UpdateUserDocumentDto): Promise<User> {
    const user = await this.findOne(id);

    if (user) {
      await this.userRepository.update(
        { id },
        this.userRepository.create(body),
      );
      this.logger.log(`Edit ${id} User`);
    }

    return this.findOne(id);
  }

  async updateBank(id: number, body: UpdateUserBankDto): Promise<User> {
    const user = await this.findOne(id);

    if (user) {
      await this.userRepository.update(
        { id },
        this.userRepository.create(body),
      );
      this.logger.log(`Edit ${id} User`);
    }

    return this.findOne(id);
  }

  async updateOther(id: number, body: UpdateUserOtherDto): Promise<User> {
    const user = await this.findOne(id);

    if (user) {
      await this.userRepository.update(
        { id },
        this.userRepository.create(body),
      );
      this.logger.log(`Edit ${id} User`);
    }

    return this.findOne(id);
  }

  async create(body: CreateUserDto) {
    const userEntity: Partial<User> = {
      ...this.userRepository.create(body),
      password: await bcrypt.hash(body.password, 10),
    };
    const user = await this.userRepository.save(userEntity, { reload: false });

    const accessToken = await this.createAccessToken(
      user.name,
      user.email,
      user.id,
    );

    return { user: await this.findByUuid(user.uuid), accessToken: accessToken };
  }

  async createUser(body: CreateUserByAdminDto) {
    const userEntity: Partial<User> = {
      ...this.userRepository.create(body),
      password: await bcrypt.hash(body.password, 10),
    };
    const user = await this.userRepository.save(userEntity, { reload: false });
    const responseUser = await this.findByUuid(user.uuid);

    return responseUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, storedPasswordHash);
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.findOne(id);

    if (user) {
      const isMatch = await this.comparePasswords(
        changePasswordDto.currentPassword,
        user.password,
      );
      if (!isMatch) {
        throw new BadRequestException('Current password is incorrect.');
      }

      await this.userRepository.update(
        { id },
        { password: await bcrypt.hash(changePasswordDto.newPassword, 10) },
      );
      return { message: 'Password updated successfully.' };
    }

    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  private async createAccessToken(name, email, id): Promise<string> {
    const payload: AccessTokenInterface = {
      name: name,
      email: email,
      id: id,
    };

    return this.jwtService.signAsync(payload);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${uuid()}-${file.originalname}`;

    const response = await this.s3
      .putObject({
        Bucket: `${process.env.AWS_BUCKET_NAME}/user-images`,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();

    const encodedKey = encodeURIComponent(key);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/user-images/${encodedKey}`;
  }

  async uploadLogo(file: Express.Multer.File): Promise<string> {
    const key = `${uuid()}-${file.originalname}`;

    const response = await this.s3
      .putObject({
        Bucket: `${process.env.AWS_BUCKET_NAME}/company-images`,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();

    const encodedKey = encodeURIComponent(key);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/company-images/${encodedKey}`;
  }

  async uploadDocument(file: Express.Multer.File): Promise<string> {
    const key = `${uuid()}-${file.originalname}`;

    const response = await this.s3
      .putObject({
        Bucket: `${process.env.AWS_BUCKET_NAME}/documents`,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();

    const encodedKey = encodeURIComponent(key);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/documents/${encodedKey}`;
  }

  generateRandomString(length: number): string {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    const randomBytes = crypto.randomBytes(length);

    let result = '';
    for (let i = 0; i < length; i++) {
      const index = randomBytes[i] % chars.length;
      result += chars[index];
    }

    return result;
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    const result = await this.findByApiKey(apiKey);

    if (result?.id > 0) {
      return true;
    } else {
      return false;
    }
  }
}
