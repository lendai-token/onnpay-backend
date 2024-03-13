import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async findAll(): Promise<User[]> {
    const queryBuilder = this.createQueryBuilder('user').orderBy(
      'user.id',
      'ASC',
    );

    const users = await queryBuilder.where({ role: 'user' }).getMany();

    return users;
  }

  async getCountActive(): Promise<number> {
    const queryBuilder = this.createQueryBuilder('user');

    const count = await queryBuilder
      .where({ isDelete: false })
      .andWhere({ activated: true })
      .getCount();

    return count;
  }
}
