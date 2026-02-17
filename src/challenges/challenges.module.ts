import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import {
  TypeOrmChallengeRepository,
  TypeOrmChallengeResultRepository,
} from './challenges.repository';
import { ChallengeResults } from './challengeResult.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, ChallengeResults])],
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
