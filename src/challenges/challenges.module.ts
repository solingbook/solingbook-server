import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmChallengeRepository } from './challenges.repository';
import { TypeOrmChallengeResultRepository } from './challengeResults.repository';
import { Challenge } from './entity/challenge.entity';
import { ChallengeResults } from './entity/challengeResult.entity';
import { Progress } from './entity/progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, ChallengeResults, Progress])],
  exports: [
    TypeOrmModule,
    TypeOrmChallengeRepository,
    TypeOrmChallengeResultRepository,
  ],
  providers: [
    ChallengesService,
    TypeOrmChallengeRepository,
    TypeOrmChallengeResultRepository,
  ],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
