import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Essay } from './entity/essay.entity';
import { ChallengePost } from './entity/challengePost.entity';
import { VerificationRule } from './entity/verificationRule.entity';
import { TypeOrmVerificationRuleRepository } from './repositories/verificationRules.repository';
import { TypeOrmChallengePostRepository } from './repositories/challengePosts.repository';
import { TypeOrmEssayRepository } from './repositories/essays.repository';
import { VerificationRulesService } from './services/verificationRules.service';
import { ChallengePostsService } from './services/challengePosts.service';
import { EssaysService } from './services/essays.service';
import { VerificationRulesController } from './controllers/verificationRules.controller';
import { ChallengePostsController } from './controllers/challengePosts.controller';
import { EssaysController } from './controllers/essays.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Essay,
      ChallengePost,
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
export class VerificationModule {}
