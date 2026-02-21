import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { TypeOrmChallengeRepository } from './challenges.repository';
import { Progress } from './progress.entity';
import { ChallengeResults } from './entity/challengeResult.entity';
import { TypeOrmChallengeResultRepository } from './challengeResults.repository';

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
