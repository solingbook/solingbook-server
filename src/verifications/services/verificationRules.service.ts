import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { TypeOrmVerificationRuleRepository } from '../repositories/verificationRules.repository';
import { VerificationRuleRepository } from '../interfaces/verificationRules.interface';
import { CreateVerificationRuleDto } from '../dto/createVerificationRule.dto';
import { ENotFoundException } from 'src/global/exceptions/ENotFoundException';
import { ERROR_CODE } from 'src/global/constant/errorCode.constant';
import { EConflictException } from 'src/global/exceptions/EConflictException';

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
      throw new EConflictException({
        message: '이미 존재하는 인증 규칙입니다.',
        errorCode: ERROR_CODE.VERIFICATION_RULE_ALREADY_EXISTS,
      });
    }

    return this.verificationRuleRepo.create(createVerificationRuleDto);
  }

  async findOne(verificationRuleId: string) {
    const verificationRule =
      await this.verificationRuleRepo.findOneById(verificationRuleId);

    if (!verificationRule)
      throw new ENotFoundException({
            message: '존재하지 않는 인증 규칙입니다.',
            errorCode: ERROR_CODE.VERIFICATION_RULE_NOT_FOUND,
          });

    return verificationRule;
  }

  async findAll() {
    return this.verificationRuleRepo.findAll();
  }

  async delete(verificationRuleId: string) {
    const result = await this.verificationRuleRepo.delete(verificationRuleId);

    if (result.affected === 0) {
      throw new ENotFoundException({
            message: '존재하지 않는 인증 규칙입니다.',
            errorCode: ERROR_CODE.VERIFICATION_RULE_NOT_FOUND,
          });;
    }
  }
}
