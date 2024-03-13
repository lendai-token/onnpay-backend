import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { UserRepository } from '../user/user.repository';
import { SettlementRepository } from '../settlement/settlement.repository';

@Module({
  imports: [UserModule],
  providers: [
    PaymentService,
    PaymentRepository,
    UserRepository,
    SettlementRepository,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
