import { Module } from '@nestjs/common';
import { VerificationRulesController } from './verificationRules.controller';
import { VerificationRulesService } from './verificationRules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Essay } from './entity/essay.entity';
import { ChallengePost } from './entity/challengePost.entity';
import { Verification } from './entity/verification.entity';
import { VerificationRule } from './entity/verificationRule.entity';
import { TypeOrmVerificationRuleRepository } from './verificationRules.repository';
import { TypeOrmChallengePostRepository } from './challengePosts.repository';
import { ChallengePostsController } from './challengePosts.controller';
import { ChallengePostsService } from './challengePosts.service';
import { TypeOrmEssayRepository } from './essays.repository';
import { EssaysController } from './essays.controller';
import { EssaysService } from './essays.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Essay,
      ChallengePost,
      Verification,
      VerificationRule,
      ChallengePost,
    ]),
  ],
  exports: [
    TypeOrmModule,
    TypeOrmVerificationRuleRepository,
    TypeOrmChallengePostRepository,
    TypeOrmEssayRepository,
  ],
  providers: [
    VerificationRulesService,
    ChallengePostsService,
    EssaysService,
    TypeOrmVerificationRuleRepository,
    TypeOrmChallengePostRepository,
    TypeOrmEssayRepository,
  ],
  controllers: [
    VerificationRulesController,
    ChallengePostsController,
    EssaysController,
  ],
})
export class VerificationRulesModule {}
