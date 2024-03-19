import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import { PaymentDto, InvoiceDto, CheckStatusDto } from './dto/payment.dto';
import { Payment } from './payment.entity';
import { PaymentRepository } from './payment.repository';
import { UserRepository } from '../user/user.repository';
import { SettlementRepository } from '../settlement/settlement.repository';

dotenv.config();

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly userRepository: UserRepository,
    private readonly settlementRepository: SettlementRepository,
  ) {}

  private readonly logger = new Logger(PaymentService.name);

  async findById(id: number): Promise<Payment> {
    this.logger.log(`Retrieve ${id} Payment`);

    return await this.paymentRepository.findById(id);
  }

  async findAll(): Promise<Payment[]> {
    this.logger.log(`Retrieve all Payment`);
    const paymentList = await this.paymentRepository.findAll();

    await Promise.all(
      paymentList.map(async (element) => {
        const statusList = await this.checkStatus(element.merchantReference);

        element.status =
          (statusList as any).transaction_status === '14'
            ? 'Success'
            : 'Pending';

        const payment = await this.paymentRepository.findById(element.id);

        if (payment) {
          await this.paymentRepository.update(
            element.id,
            this.paymentRepository.create(element),
          );
          this.logger.log(`Edit ${element.id} Payment`);
        }
      }),
    );

    return paymentList;
  }

  async findByEmail(email: string): Promise<Payment[]> {
    this.logger.log(`Retrieve all Payments by ${email}`);

    const paymentList = await this.paymentRepository.findByEmail(email);

    await Promise.all(
      paymentList.map(async (element) => {
        const statusList = await this.checkStatus(element.merchantReference);

        element.status =
          (statusList as any).transaction_status === '14'
            ? 'Success'
            : 'Pending';

        const payment = await this.paymentRepository.findById(element.id);

        if (payment) {
          await this.paymentRepository.update(
            element.id,
            this.paymentRepository.create(element),
          );
          this.logger.log(`Edit ${element.id} Payment`);
        }
      }),
    );

    return paymentList;
  }

  async generatePaymentLink(body: PaymentDto): Promise<string> {
    try {
      const merchantIdentifier = process.env.PF_MERCHANT_IDENTIFIER;
      const accessCode = process.env.PF_ACCESS_CODE;
      const secretKey = process.env.PF_SHA_REQUEST_PHRASE;

      const data = {
        command: body.command,
        access_code: accessCode,
        merchant_identifier: merchantIdentifier,
        merchant_reference: body.merchantReference,
        amount: body.amount,
        currency: body.currency,
        language: body.language,
        customer_email: body.email,
        customer_name: body.name,
        token_name: body.tokenName,
        card_security_code: body.cardSecurityCode,
        return_url: body.returnUrl,
      };

      const signature = await this.generateSignature(data, secretKey);
      data['signature'] = signature;

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post(process.env.PF_API_URL, data, {
        headers,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  async checkStatus(merchantReference: string): Promise<object> {
    try {
      const merchantIdentifier = process.env.PF_MERCHANT_IDENTIFIER;
      const accessCode = process.env.PF_ACCESS_CODE;
      const secretKey = process.env.PF_SHA_REQUEST_PHRASE;

      const data = {
        query_command: 'CHECK_STATUS',
        access_code: accessCode,
        merchant_identifier: merchantIdentifier,
        merchant_reference: merchantReference,
        language: 'en',
      };

      const signature = await this.generateSignature(data, secretKey);
      data['signature'] = signature;

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post(process.env.PF_API_URL, data, {
        headers,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  async createInvoice(body: InvoiceDto): Promise<string> {
    try {
      const merchantIdentifier = process.env.PF_MERCHANT_IDENTIFIER;
      const accessCode = process.env.PF_ACCESS_CODE;
      const secretKey = process.env.PF_SHA_REQUEST_PHRASE;

      const data = {
        service_command: body.serviceCommand,
        access_code: accessCode,
        merchant_identifier: merchantIdentifier,
        merchant_reference: body.merchantReference,
        amount: body.amount * 100,
        currency: body.currency,
        language: body.language,
        customer_email: body.email,
        customer_phone: body.phone,
        order_description: body.orderDescription,
        link_command: body.linkCommand,
        request_expiry_date: body.expiryDate,
        payment_link_id: body.invoiceNo,
        notification_type: body.notification,
        return_url: process.env.PF_REDIRECT_URL,
      };

      const signature = await this.generateSignature(data, secretKey);
      data['signature'] = signature;

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post(process.env.PF_API_URL, data, {
        headers,
      });

      if (response.data.status === '00' && response.data.response_message) {
        return response.data;
      } else {
        const addData = {
          invoiceNo: response.data.payment_link_id,
          merchantReference: response.data.merchant_reference,
          amount: parseFloat(response.data.amount),
          currency: response.data.currency,
          language: response.data.language,
          email: body.email,
          expiryDate: response.data.request_expiry_date,
          notification: response.data.notification_type,
          orderDescription: response.data.order_description
            ? response.data.order_description
            : '',
          name: body.name,
          phone: body.phone,
          paymentLink: response.data.payment_link,
          createdBy: body.createdBy,
        };

        const paymentEntity = await this.paymentRepository.create(addData);

        await this.paymentRepository.save(paymentEntity, {
          reload: false,
        });

        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  // Generate HMAC SHA-256 signature for the request parameters
  async generateSignature(params: any, secretKey: string): Promise<string> {
    let shaString = '';

    Object.keys(params)
      .sort()
      .forEach((key) => {
        shaString += `${key}=${params[key]}`;
      });

    shaString = `${secretKey}${shaString}${secretKey}`;

    const signature = crypto
      .createHash('sha256')
      .update(shaString)
      .digest('hex');

    return signature;
  }

  async getTopFiveUsers(): Promise<Array<any>> {
    const result = await this.paymentRepository.getTopFiveUsers();

    await Promise.all(
      result.map(async (element) => {
        const user = await this.userRepository.findOne({
          where: { email: element.createdBy },
        });

        element.user = user;
      }),
    );

    return result;
  }

  async getAllCount(): Promise<number> {
    return await this.paymentRepository.getAllCount();
  }

  async getAllCountByEmail(email: string): Promise<number> {
    return await this.paymentRepository.getAllCountByEmail(email);
  }

  async getPendingCount(): Promise<number> {
    return await this.paymentRepository.getPendingCount();
  }

  async getPendingCountByEmail(email: string): Promise<number> {
    return await this.paymentRepository.getPendingCountByEmail(email);
  }

  async getSalesByYear(year: string): Promise<Array<number>> {
    return await this.paymentRepository.getSalesByYear(year);
  }

  async getPendingByYear(year: string): Promise<Array<number>> {
    return await this.paymentRepository.getPendingByYear(year);
  }

  async getPaymentsByYear(year: string): Promise<Array<number>> {
    return await this.paymentRepository.getPaymentsByYear(year);
  }

  async getSalesByEmail(email: string, year: string): Promise<Array<number>> {
    return await this.paymentRepository.getSalesByEmail(email, year);
  }

  async getPaymentsByEmail(
    email: string,
    year: string,
  ): Promise<Array<number>> {
    return await this.paymentRepository.getPaymentsByEmail(email, year);
  }

  async getSalesAmountByYear(
    thisYear: string,
    prevYear: string,
  ): Promise<{
    thisYear: Array<number>;
    prevYear: Array<number>;
    increasePercent: number;
  }> {
    return await this.paymentRepository.getSalesAmountByYear(
      thisYear,
      prevYear,
    );
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
    return await this.paymentRepository.getSalesAmountByEmail(
      email,
      thisYear,
      prevYear,
    );
  }

  async getInvoicesByEmail(email: string): Promise<{
    [date: string]: {
      amount: number;
      currency: string;
      id?: number;
      status?: string;
    };
  }> {
    const list = await this.paymentRepository.getDailySalesAmount(email);

    const user = await this.userRepository.findOne({
      where: { email, activated: true },
    });

    await Promise.all(
      Object.keys(list).map(async (date) => {
        const result = await this.settlementRepository.getStatusByDate(
          date,
          email,
        );

        const commission =
          list[date].currency === 'AED'
            ? user.commission
            : user.internationalCommission;

        list[date] = {
          amount:
            list[date].amount -
            (list[date].amount * commission) / 100 -
            user.withdrawal -
            user.other,
          currency: list[date].currency,
          id: result.id,
          status: result.status,
        };
      }),
    );

    return list;
  }

  async getInvoicesByDate(
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
    const list = await this.paymentRepository.getDateRangeSalesAmount(
      email,
      start,
      end,
    );

    const user = await this.userRepository.findOne({
      where: { email, activated: true },
    });

    await Promise.all(
      Object.keys(list).map(async (date) => {
        const result = await this.settlementRepository.getStatusByDate(
          date,
          email,
        );

        const commission =
          list[date].currency === 'AED'
            ? user.commission
            : user.internationalCommission;

        list[date] = {
          amount:
            list[date].amount -
            (list[date].amount * commission) / 100 -
            user.withdrawal -
            user.other,
          currency: list[date].currency,
          id: result.id,
          status: result.status,
        };
      }),
    );

    return list;
  }
}
