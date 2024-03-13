import { Injectable, Logger } from '@nestjs/common';
import { SettlementDto } from './dto/create.dto';
import { UpdateStatusDto } from './dto/update.dto';
import { CompleteDto } from './dto/update.dto';
import { Settlement } from './settlement.entity';
import { SettlementRepository } from './settlement.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class SettlementService {
  constructor(
    private readonly settlementRepository: SettlementRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private readonly logger = new Logger(SettlementService.name);

  async findById(id: number): Promise<Settlement> {
    this.logger.log(`Retrieve ${id} Settlement`);

    return await this.settlementRepository.findById(id);
  }

  async findAll(): Promise<Settlement[]> {
    this.logger.log(`Retrieve all Settlements`);

    const list = await this.settlementRepository.findAll();

    return list;
  }

  async findByEmail(email: string): Promise<Settlement[]> {
    this.logger.log(`Retrieve all Settlements by ${email}`);

    const list = await this.settlementRepository.findByEmail(email);

    return list;
  }

  async getCompletedAmount(email: string): Promise<Number> {
    return await this.settlementRepository.getCompletedAmount(email);
  }

  async request(body: SettlementDto): Promise<Settlement> {
    const settlementEntity = await this.settlementRepository.create(body);

    const result = await this.settlementRepository.save(settlementEntity, {
      reload: false,
    });

    this.logger.log(`Create new Settlement`);

    return await this.findById(result.id);
  }

  async update(id: number, body: UpdateStatusDto): Promise<Settlement> {
    const settlement = await this.findById(id);

    if (settlement) {
      await this.settlementRepository.update(
        { id },
        this.settlementRepository.create(body),
      );
      this.logger.log(`Update ${id} settlement status`);
    }

    return this.findById(id);
  }

  async complete(id: number, body: CompleteDto): Promise<Settlement> {
    const settlement = await this.findById(id);

    if (settlement) {
      await this.settlementRepository.update(
        { id },
        this.settlementRepository.create(body),
      );
      this.logger.log(`Complete ${id} settlement`);
    }

    return this.findById(id);
  }
}
