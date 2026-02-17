import { DeleteResult } from 'typeorm';
import { Challenge } from './challenge.entity';
import { CreateChallengeDto } from './dto/createChallenge.dto';
import { CreateChallengeResultDto } from './dto/createChallengeResult.dto';
import { ChallengeResults } from './challengeResult.entity';

export interface ChallengeRepository {
  create(challenge: CreateChallengeDto): Promise<Challenge>;
  findOneById(id: string): Promise<Challenge | null>;
  findAll(): Promise<Challenge[]>;
  delete(id: string): Promise<DeleteResult>;
}

export interface ChallengeResultRepository {
  createResult(challenge: CreateChallengeResultDto): Promise<ChallengeResults>;
  findAllResults(): Promise<ChallengeResults[]>;
  findByProgressId(id: string): Promise<ChallengeResults | null>;
}
