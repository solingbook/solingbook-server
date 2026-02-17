import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { Repository } from 'typeorm';
import {
  ChallengeRepository,
  ChallengeResultRepository,
} from './challenges.interface';
import { ChallengeResults } from './challengeResult.entity';
import { CreateChallengeResultDto } from './dto/createChallengeResult.dto';

@Injectable()
export class TypeOrmChallengeRepository implements ChallengeRepository {
  constructor(
    @InjectRepository(Challenge)
    private readonly repo: Repository<Challenge>,
  ) {}

  async create(challenge: Partial<Challenge>) {
    const newChallenge = this.repo.create(challenge);

    return this.repo.save(newChallenge);
  }

  async findOneById(challengeId: string): Promise<Challenge | null> {
    return this.repo.findOneBy({ challengeId });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(challengeId: string) {
    return this.repo.delete({ challengeId });
  }
}

@Injectable()
export class TypeOrmChallengeResultRepository implements ChallengeResultRepository {
  constructor(
    @InjectRepository(ChallengeResults)
    private readonly repo: Repository<ChallengeResults>,
  ) {}

  async createResult(
    challengeResult: CreateChallengeResultDto,
  ): Promise<ChallengeResults> {
    const result = this.repo.create(challengeResult);
    return this.repo.save(result);
  }

  async findByProgressId(progressId: string): Promise<ChallengeResults | null> {
    return this.repo.findOneBy({ progressId });
  }
  async findAllResults(): Promise<ChallengeResults[]> {
    return this.repo.find();
  }
}
