import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TypeOrmVerificationRuleRepository } from './verificationRules.repository';
import { VerificationRuleRepository } from './verificationRules.interface';
import { CreateVerificationRuleDto } from './dto/createVerificationRule.dto';

@Injectable()
export class VerificationRulesService {
  constructor(
    @Inject(TypeOrmVerificationRuleRepository)
    private readonly verificationRuleRepo: VerificationRuleRepository,
  ) {}

  async create(createVerificationRuleDto: CreateVerificationRuleDto) {
    const existing = await this.verificationRuleRepo.findOneByChallengeId(
      createVerificationRuleDto.challengeId,
    );

    if (existing) {
      throw new ConflictException(
        'Verification rule already exists for this challenge',
      );
    }

    return this.verificationRuleRepo.create(createVerificationRuleDto);
  }

  async findOne(verificationRuleId: string) {
    const verificationRule =
      await this.verificationRuleRepo.findOneById(verificationRuleId);

    if (!verificationRule)
      throw new NotFoundException('Verication Rule not found');

    return verificationRule;
  }

  async findAll() {
    return this.verificationRuleRepo.findAll();
  }

  async delete(verificationRuleId: string) {
    const result = await this.verificationRuleRepo.delete(verificationRuleId);

    if (result.affected === 0) {
      throw new NotFoundException('VerificationRule not found');
    }
  }
}
