import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { TypeOrmChallengeRepository } from './challenges.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  exports: [TypeOrmModule, TypeOrmChallengeRepository],
  providers: [ChallengesService, TypeOrmChallengeRepository],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
