import { DeleteResult } from 'typeorm';
import { Challenge } from './challenge.entity';
import { CreateChallengeDto } from './dto/createChallenge.dto';

export interface ChallengeRepository {
  create(challenge: CreateChallengeDto): Promise<Challenge>;
  findOneById(id: string): Promise<Challenge | null>;
  findAll(): Promise<Challenge[]>;
  delete(id: string): Promise<DeleteResult>;
}
