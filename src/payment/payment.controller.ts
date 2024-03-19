import {
  Body,
  Headers,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
  Query,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from '@src/user/user.service';
import { PaymentService } from '@src/payment/payment.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { ApiResponseHelper } from '@src/common/helpers/api-response.helper';
import { User } from '@src/user/user.entity';
import { Payment } from '@src/payment/payment.entity';
import { PaymentDto, InvoiceDto, CheckStatusDto } from './dto/payment.dto';

@Controller('payment')
// @ApiResponse(ApiResponseHelper.success(User))
// @ApiResponse(ApiResponseHelper.unauthorized())
// @UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ description: `Send Payment Link` })
  //   @ApiResponse(ApiResponseHelper.success(Payment))
  //   @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @Post('create_payment')
  async get_payment_link(@Body() body: PaymentDto): Promise<string> {
    const userInfo = await this.userService.findOne(body.userid);

    return this.paymentService.generatePaymentLink(body, userInfo.merchantId, userInfo.accessCode, userInfo.shaRequest);
  }

  @ApiOperation({ description: `Create invoice` })
  @Post('create_invoice')
  async create_invoice(
    @Body() body: InvoiceDto,
    @Headers('x-api-key') apiKey: string,
  ): Promise<string> {
    const userInfo = await this.userService.findOne(body.userid);

    if (apiKey === process.env.DEFAULT_API_KEY) {
      return this.paymentService.createInvoice(body, userInfo.merchantId, userInfo.accessCode, userInfo.shaRequest);
    }

    const isValidApiKey = await this.userService.validateApiKey(apiKey);

    if (!isValidApiKey) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return this.paymentService.createInvoice(body, userInfo.merchantId, userInfo.accessCode, userInfo.shaRequest);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    const allPayments = await this.paymentService.findAll();
    return allPayments;
  }

  @Get('get_all_by_email')
  async findAllByEmail(@Query('email') email: string): Promise<Payment[]> {
    const allPayments = await this.paymentService.findByEmail(email);
    return allPayments;
  }

  @ApiOperation({ description: `Get top five users info` })
  @Get('get_top_five_users/')
  async getTopFiveUsers(): Promise<any> {
    return this.paymentService.getTopFiveUsers();
  }

  @Get('count_all')
  async getAll(): Promise<number> {
    return this.paymentService.getAllCount();
  }

  @Get('count_all_by_email')
  async getAllByEmail(@Query('email') email: string): Promise<number> {
    return this.paymentService.getAllCountByEmail(email);
  }

  @Get('count_pending')
  async getPending(): Promise<number> {
    return this.paymentService.getPendingCount();
  }

  @Get('count_pending_by_email')
  async getPendingByEmail(@Query('email') email: string): Promise<number> {
    return this.paymentService.getPendingCountByEmail(email);
  }

  @Get('count_sales_by_year')
  async getSalesByYear(@Query('year') year: string): Promise<Array<number>> {
    return this.paymentService.getSalesByYear(year);
  }

  @Get('count_pending_by_year')
  async getPendingByYear(@Query('year') year: string): Promise<Array<number>> {
    return this.paymentService.getPendingByYear(year);
  }

  @Get('count_payments_by_year')
  async getPaymentsByYear(@Query('year') year: string): Promise<Array<number>> {
    return this.paymentService.getPaymentsByYear(year);
  }

  @Get('count_sales_by_email')
  async getSalesByEmail(
    @Query('email') email: string,
    @Query('year') year: string,
  ): Promise<Array<number>> {
    return this.paymentService.getSalesByEmail(email, year);
  }

  @Get('count_payments_by_email')
  async getPaymentsByEmail(
    @Query('email') email: string,
    @Query('year') year: string,
  ): Promise<Array<number>> {
    return this.paymentService.getPaymentsByEmail(email, year);
  }

  @Get('amount_sales_by_year')
  async getSalesAmountByYear(
    @Query('thisYear') thisYear: string,
    @Query('prevYear') prevYear: string,
  ): Promise<{
    thisYear: Array<number>;
    prevYear: Array<number>;
    increasePercent: number;
  }> {
    return this.paymentService.getSalesAmountByYear(thisYear, prevYear);
  }

  @Get('amount_sales_by_email')
  async getSalesAmountByEmail(
    @Query('email') email: string,
    @Query('thisYear') thisYear: string,
    @Query('prevYear') prevYear: string,
  ): Promise<{
    thisYear: Array<number>;
    prevYear: Array<number>;
    increasePercent: number;
  }> {
    return this.paymentService.getSalesAmountByEmail(email, thisYear, prevYear);
  }

  @Get('get_invoices_by_email')
  async getInvoicesByEmail(@Query('email') email: string): Promise<{
    [date: string]: {
      amount: number;
      status?: string;
    };
  }> {
    return this.paymentService.getInvoicesByEmail(email);
  }

  @Get('get_invoices_by_date')
  async getInvoicesByDate(
    @Query('email') email: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ): Promise<{
    [date: string]: {
      amount: number;
      status?: string;
    };
  }> {
    return this.paymentService.getInvoicesByDate(email, start, end);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Payment> {
    const Payment = await this.paymentService.findById(id);
    return Payment;
  }
}
