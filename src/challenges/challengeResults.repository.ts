import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateChallengeResultDto } from './dto/createChallengeResult.dto';
import { ChallengeResults } from './entity/challengeResult.entity';
import { ChallengeResultRepository } from './challengeResults.interface';

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
