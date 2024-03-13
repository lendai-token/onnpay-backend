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

import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { SettlementService } from '@src/settlement/settlement.service';
import { Settlement } from '@src/settlement/settlement.entity';
import { SettlementDto } from './dto/create.dto';
import { UpdateStatusDto } from './dto/update.dto';
import { CompleteDto } from './dto/update.dto';

@Controller('settlement')
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @ApiOperation({ description: `Request settlement` })
  @Post('request_settlement')
  async request_settlement(@Body() body: SettlementDto): Promise<Settlement> {
    return this.settlementService.request(body);
  }

  @Get()
  async findAll(): Promise<Settlement[]> {
    const allSettlements = await this.settlementService.findAll();

    return allSettlements;
  }

  @Get('get_completed_amount')
  async getCompletedAmount(@Query('email') email: string): Promise<Number> {
    return await this.settlementService.getCompletedAmount(email);
  }

  @Patch('update_status/:id')
  async update(@Param('id') id: number, @Body() updateStatus: UpdateStatusDto) {
    const update = await this.settlementService.update(id, updateStatus);
    return update;
  }

  @Patch('complete/:id')
  async complete(@Param('id') id: number, @Body() body: CompleteDto) {
    const update = await this.settlementService.complete(id, body);
    return update;
  }
}
