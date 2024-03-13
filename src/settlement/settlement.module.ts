import { Module } from '@nestjs/common';
import { SettlementController } from './settlement.controller';
import { SettlementService } from './settlement.service';
import { SettlementRepository } from './settlement.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [SettlementController],
  providers: [SettlementService, SettlementRepository, UserRepository],
})
export class SettlementModule {}
