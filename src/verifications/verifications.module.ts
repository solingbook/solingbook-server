import { Module } from '@nestjs/common';
import { VerificationRulesController } from './verificationRules.controller';
import { VerificationRulesService } from './verificationRules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Essay } from './entity/essay.entity';
import { ChallengePost } from './entity/challengePost.entity';
import { Verification } from './entity/verification.entity';
import { VerificationRule } from './entity/verificationRule.entity';
import { TypeOrmVerificationRuleRepository } from './verificationRules.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Essay,
      ChallengePost,
      Verification,
      VerificationRule,
    ]),
  ],
  exports: [TypeOrmModule, TypeOrmVerificationRuleRepository],
  providers: [VerificationRulesService, TypeOrmVerificationRuleRepository],
  controllers: [VerificationRulesController],
})
export class VerificationRulesModule {}
