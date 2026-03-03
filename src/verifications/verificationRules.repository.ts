import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationRule } from './entity/verificationRule.entity';
import { Repository } from 'typeorm';
import { VerificationRuleRepository } from './verificationRules.interface';
import { CreateVerificationRuleDto } from './dto/createVerificationRule.dto';

@Injectable()
export class TypeOrmVerificationRuleRepository implements VerificationRuleRepository {
  constructor(
    @InjectRepository(VerificationRule)
    private readonly repo: Repository<VerificationRule>,
  ) {}

  async create(createVerificationRuleDto: CreateVerificationRuleDto) {
    const newVerificationRule = this.repo.create(createVerificationRuleDto);

    return this.repo.save(newVerificationRule);
  }

  async findOneById(
    verificationRuleId: string,
  ): Promise<VerificationRule | null> {
    return this.repo.findOneBy({ verificationRuleId });
  }

  async findOneByChallengeId(
    challengeId: string,
  ): Promise<VerificationRule | null> {
    return this.repo.findOneBy({ challengeId });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(verificationRuleId: string) {
    return this.repo.delete({ verificationRuleId });
  }
}
