import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentRepository extends Repository<Payment> {
  constructor(private readonly dataSource: DataSource) {
    super(Payment, dataSource.manager);
  }

  async findById(id: number): Promise<Payment> {
    const queryBuilder = this.createQueryBuilder('payment');

    const payment = await queryBuilder.where({ id, isDelete: false }).getOne();

    return payment;
  }

  async findAll(): Promise<Payment[]> {
    const queryBuilder = this.createQueryBuilder('payment');

    const payments = await queryBuilder.where({ isDelete: false }).getMany();

    return payments;
  }

  async findByEmail(email: string): Promise<Payment[]> {
    const queryBuilder = this.createQueryBuilder('payment');

    const payments = await queryBuilder
      .where({ isDelete: false })
      .andWhere({ createdBy: email })
      .getMany();

    return payments;
  }

  async getTopFiveUsers(): Promise<Array<any>> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    startOfMonth.setMonth(startOfMonth.getMonth() - 1);

    const queryBuilder = this.createQueryBuilder('payment');

    const result = await queryBuilder
      .select('COUNT(payment.id)', 'count')
      .addSelect(
        "SUM(CASE WHEN payment.currency = 'USD' THEN payment.amount ELSE 0 END)",
        'totalUSD',
      )
      .addSelect(
        "SUM(CASE WHEN payment.currency = 'AED' THEN payment.amount ELSE 0 END)",
        'totalAED',
      )
      .addSelect('payment.createdBy', 'createdBy')
      .where('payment.createdAt >= :startOfMonth', { startOfMonth })
      .groupBy('payment.createdBy')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    return result;
  }

  async getAllCount(): Promise<number> {
    const queryBuilder = this.createQueryBuilder('payment');

    const count = await queryBuilder.where({ isDelete: false }).getCount();

    return count;
  }

  async getAllCountByEmail(email: string): Promise<number> {
    const queryBuilder = this.createQueryBuilder('payment');

    const count = await queryBuilder
      .where({ isDelete: false })
      .andWhere({ createdBy: email })
      .getCount();

    return count;
  }

  async getPendingCount(): Promise<number> {
    const queryBuilder = this.createQueryBuilder('payment');

    const count = await queryBuilder
      .where({ isDelete: false })
      .andWhere({ status: 'Pending' })
      .getCount();

    return count;
  }

  async getPendingCountByEmail(email: string): Promise<number> {
    const queryBuilder = this.createQueryBuilder('payment');

    const count = await queryBuilder
      .where({ isDelete: false })
      .andWhere({ status: 'Pending' })
      .andWhere({ createdBy: email })
      .getCount();

    return count;
  }

  async getSalesByYear(year: string): Promise<Array<number>> {
    const queryBuilder = this.createQueryBuilder('payment');

    const countByMonth = await queryBuilder
      .select(`DATE_TRUNC('month', created_at) AS month, COUNT(*) AS count`)
      .where(`EXTRACT(YEAR FROM created_at) = :year`, { year })
      .andWhere({ status: 'Success' })
      .groupBy(`month`)
      .getRawMany();

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const item = countByMonth.find(
        (item) => new Date(item.month).getMonth() + 1 === i,
      );
      result.push(item ? parseInt(item.count) : 0);
    }

    return result;
  }

  async getPendingByYear(year: string): Promise<Array<number>> {
    const queryBuilder = this.createQueryBuilder('payment');

    const countByMonth = await queryBuilder
      .select(`DATE_TRUNC('month', created_at) AS month, COUNT(*) AS count`)
      .where(`EXTRACT(YEAR FROM created_at) = :year`, { year })
      .andWhere({ status: 'Pending' })
      .groupBy(`month`)
      .getRawMany();

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const item = countByMonth.find(
        (item) => new Date(item.month).getMonth() + 1 === i,
      );
      result.push(item ? parseInt(item.count) : 0);
    }

    return result;
  }

  async getPaymentsByYear(year: string): Promise<Array<number>> {
    const queryBuilder = this.createQueryBuilder('payment');

    const countByMonth = await queryBuilder
      .select(`DATE_TRUNC('month', created_at) AS month, COUNT(*) AS count`)
      .where(`EXTRACT(YEAR FROM created_at) = :year`, { year })
      .groupBy(`month`)
      .getRawMany();

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const item = countByMonth.find(
        (item) => new Date(item.month).getMonth() + 1 === i,
      );
      result.push(item ? parseInt(item.count) : 0);
    }

    return result;
  }

  async getSalesByEmail(email: string, year: string): Promise<Array<number>> {
    const queryBuilder = this.createQueryBuilder('payment');

    const countByMonth = await queryBuilder
      .select(`DATE_TRUNC('month', created_at) AS month, COUNT(*) AS count`)
      .where(`EXTRACT(YEAR FROM created_at) = :year`, { year })
      .andWhere({ status: 'Success' })
      .andWhere({ createdBy: email })
      .groupBy(`month`)
      .getRawMany();

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const item = countByMonth.find(
        (item) => new Date(item.month).getMonth() + 1 === i,
      );
      result.push(item ? parseInt(item.count) : 0);
    }

    return result;
  }

  async getPaymentsByEmail(
    email: string,
    year: string,
  ): Promise<Array<number>> {
    const queryBuilder = this.createQueryBuilder('payment');

    const countByMonth = await queryBuilder
      .select(`DATE_TRUNC('month', created_at) AS month, COUNT(*) AS count`)
      .where(`EXTRACT(YEAR FROM created_at) = :year`, { year })
      .andWhere({ createdBy: email })
      .groupBy(`month`)
      .getRawMany();

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const item = countByMonth.find(
        (item) => new Date(item.month).getMonth() + 1 === i,
      );
      result.push(item ? parseInt(item.count) : 0);
    }

    return result;
  }

  async getSalesAmountByYear(
    thisYear: string,
    prevYear: string,
  ): Promise<{
    thisYear: Array<number>;
    prevYear: Array<number>;
    increasePercent: number;
  }> {
    const queryBuilder = this.createQueryBuilder('payment');

    // Query for the sales of thisYear
    const countThisYearByMonth = await queryBuilder
      .select(`DATE_TRUNC('month', created_at) AS month, SUM(amount) AS amount`)
      .where(`EXTRACT(YEAR FROM created_at) = :thisYear`, { thisYear })
      .andWhere({ status: 'Success' })
      .groupBy(`month`)
      .getRawMany();

    // Query for the sales of prevYear
    const countPrevYearByMonth = await queryBuilder
      .select(`DATE_TRUNC('month', created_at) AS month, SUM(amount) AS amount`)
      .where(`EXTRACT(YEAR FROM created_at) = :prevYear`, { prevYear })
      .andWhere({ status: 'Success' })
      .groupBy(`month`)
      .getRawMany();

    // Combine countThisYearByMonth and countPrevYearByMonth into a single array
    const combinedCountByMonth = [];
    for (let i = 1; i <= 12; i++) {
      const thisYearItem = countThisYearByMonth.find(
        (item) => new Date(item.month).getMonth() + 1 === i,
      );
      const prevYearItem = countPrevYearByMonth.find(
        (item) => new Date(item.month).getMonth() + 1 === i,
      );
      const thisYearAmount = thisYearItem
        ? parseInt(thisYearItem.amount) / 100
        : 0;
      const prevYearAmount = prevYearItem
        ? parseInt(prevYearItem.amount) / 100
        : 0;
      combinedCountByMonth.push({
        thisYear: thisYearAmount,
        prevYear: prevYearAmount,
      });
    }

    // Calculate the percentage increase of thisYear over prevYear
    const thisYearTotal = combinedCountByMonth.reduce(
      (acc, item) => acc + item.thisYear,
      0,
    );
    const prevYearTotal = combinedCountByMonth.reduce(
      (acc, item) => acc + item.prevYear,
      0,
    );
    const increasePercent =
      ((thisYearTotal - prevYearTotal) / prevYearTotal) * 100;

    // Format the result object as required
    const result = {
      thisYear: combinedCountByMonth.map((item) => item.thisYear),
      prevYear: combinedCountByMonth.map((item) => item.prevYear),
      increasePercent: Math.round(increasePercent),
    };

    return result;
  }

  async getSalesAmountByEmail(
    email: string,
    thisYear: string,
    prevYear: string,
  ): Promise<{
    thisYear: Array<number>;
    prevYear: Array<number>;
    increasePercent: number;
  }> {
    const queryBuilder = this.createQueryBuilder('payment');

    // Query for the sales of thisYear
    const countThisYearByMonth = await queryBuilder
      .select(`DATE_TRUNC('month', created_at) AS month, SUM(amount) AS amount`)
      .where(`EXTRACT(YEAR FROM created_at) = :thisYear`, { thisYear })
      .andWhere({ createdBy: email })
      .andWhere({ status: 'Success' })
      .groupBy(`month`)
      .getRawMany();

    // Query for the sales of prevYear
    const countPrevYearByMonth = await queryBuilder
      .select(`DATE_TRUNC('month', created_at) AS month, SUM(amount) AS amount`)
      .where(`EXTRACT(YEAR FROM created_at) = :prevYear`, { prevYear })
      .andWhere({ createdBy: email })
      .andWhere({ status: 'Success' })
      .groupBy(`month`)
      .getRawMany();

    // Combine countThisYearByMonth and countPrevYearByMonth into a single array
    const combinedCountByMonth = [];
    for (let i = 1; i <= 12; i++) {
      const thisYearItem = countThisYearByMonth.find(
        (item) => new Date(item.month).getMonth() + 1 === i,
      );
      const prevYearItem = countPrevYearByMonth.find(
        (item) => new Date(item.month).getMonth() + 1 === i,
      );
      const thisYearAmount = thisYearItem
        ? parseInt(thisYearItem.amount) / 100
        : 0;
      const prevYearAmount = prevYearItem
        ? parseInt(prevYearItem.amount) / 100
        : 0;
      combinedCountByMonth.push({
        thisYear: thisYearAmount,
        prevYear: prevYearAmount,
      });
    }

    // Calculate the percentage increase of thisYear over prevYear
    const thisYearTotal = combinedCountByMonth.reduce(
      (acc, item) => acc + item.thisYear,
      0,
    );
    const prevYearTotal = combinedCountByMonth.reduce(
      (acc, item) => acc + item.prevYear,
      0,
    );
    const increasePercent =
      ((thisYearTotal - prevYearTotal) / prevYearTotal) * 100;

    // Format the result object as required
    const result = {
      thisYear: combinedCountByMonth.map((item) => item.thisYear),
      prevYear: combinedCountByMonth.map((item) => item.prevYear),
      increasePercent: Math.round(increasePercent),
    };

    return result;
  }

  async getDailySalesAmount(email: string): Promise<{
    [date: string]: {
      amount: number;
      currency: string;
      id?: number;
      status?: string;
    };
  }> {
    const today = new Date();
    const twoDaysAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const queryBuilder = this.createQueryBuilder('payment');

    const payments = await queryBuilder
      .where({ isDelete: false })
      .andWhere({ status: 'Success' })
      .andWhere({ createdBy: email })
      .andWhere('NOT updated_at BETWEEN :twoDaysAgo AND :today', {
        twoDaysAgo,
        today,
      })
      .orderBy('updated_at', 'ASC')
      .getMany();

    const dailySalesAmount: {
      [date: string]: {
        amount: number;
        currency: string;
        id?: number;
        status?: string;
      };
    } = {};

    payments.forEach((payment) => {
      const date = payment.createdAt.toISOString().substring(0, 10);

      dailySalesAmount[date] = dailySalesAmount[date] || {
        amount: 0,
        currency: payment.currency,
        id: 0,
        status: 'request',
      };
      dailySalesAmount[date].amount += payment.amount / 100;
    });

    return dailySalesAmount;
  }

  async getDateRangeSalesAmount(
    email: string,
    start: string,
    end: string,
  ): Promise<{
    [date: string]: {
      amount: number;
      currency: string;
      id?: number;
      status?: string;
    };
  }> {
    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + 1);

    const today = new Date();
    const twoDaysAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const queryBuilder = this.createQueryBuilder('payment');

    const payments = await queryBuilder
      .where({ isDelete: false })
      .andWhere({ status: 'Success' })
      .andWhere({ createdBy: email })
      .andWhere('created_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('NOT updated_at BETWEEN :twoDaysAgo AND :today', {
        twoDaysAgo,
        today,
      })
      .orderBy('updated_at', 'ASC')
      .getMany();

    const dailySalesAmount: {
      [date: string]: {
        amount: number;
        currency: string;
        id?: number;
        status?: string;
      };
    } = {};

    payments.forEach((payment) => {
      const date = payment.createdAt.toISOString().substring(0, 10);

      dailySalesAmount[date] = dailySalesAmount[date] || {
        amount: 0,
        currency: payment.currency,
        id: 0,
        status: 'request',
      };
      dailySalesAmount[date].amount += payment.amount / 100;
    });

    return dailySalesAmount;
  }
}
