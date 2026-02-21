import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { Repository } from 'typeorm';
import { ChallengeRepository } from './challenges.interface';

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
