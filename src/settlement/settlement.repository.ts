import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Settlement } from './settlement.entity';

@Injectable()
export class SettlementRepository extends Repository<Settlement> {
  constructor(private readonly dataSource: DataSource) {
    super(Settlement, dataSource.manager);
  }

  async findById(id: number): Promise<Settlement> {
    const queryBuilder = this.createQueryBuilder('settlement');

    const settlement = await queryBuilder.getOne();

    return settlement;
  }

  async findAll(): Promise<Settlement[]> {
    const queryBuilder = this.createQueryBuilder('payment');

    const settlements = await queryBuilder.getMany();

    return settlements;
  }

  async findByEmail(email: string): Promise<Settlement[]> {
    const queryBuilder = this.createQueryBuilder('settlement');

    const settlements = await queryBuilder
      .where({ createdBy: email })
      .getMany();

    return settlements;
  }

  async getStatusByDate(date: string, email: string): Promise<any> {
    const queryBuilder = this.createQueryBuilder('settlement');

    const result = await queryBuilder
      .select('id, status')
      .where({ createdBy: email })
      .andWhere({ date: date })
      .getRawOne();

    if (result === undefined) {
      return '';
    }

    return result;
  }

  async getCompletedAmount(email: string): Promise<number> {
    const queryBuilder = this.createQueryBuilder('settlement');

    const result = await queryBuilder
      .select('SUM(amount)', 'amount')
      .where({ status: 'complete' })
      .andWhere({ createdBy: email })
      .getRawOne();

    if (result === undefined) {
      return 0;
    }

    return result['amount'];
  }
}
