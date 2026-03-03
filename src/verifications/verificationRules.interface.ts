import { DeleteResult } from 'typeorm';
import { CreateVerificationRuleDto } from './dto/createVerificationRule.dto';
import { VerificationRule } from './entity/verificationRule.entity';

export interface VerificationRuleRepository {
  create(
    createVerificationRuleDto: CreateVerificationRuleDto,
  ): Promise<VerificationRule>;
  findOneById(id: string): Promise<VerificationRule | null>;
  findOneByChallengeId(challengeId: string): Promise<VerificationRule | null>;
  findAll(): Promise<VerificationRule[]>;
  delete(id: string): Promise<DeleteResult>;
}
