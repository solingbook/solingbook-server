import { DeleteResult } from 'typeorm';
import { CreateChallengePostDto } from '../dto/createChallengePost.dto';
import { ChallengePost } from '../entity/challengePost.entity';

export interface ChallengePostRepository {
  create(
    createChallengePostDto: CreateChallengePostDto,
  ): Promise<ChallengePost>;
  findOneById(id: string): Promise<ChallengePost | null>;
  findOneByWriterId(writerId: string): Promise<ChallengePost | null>;
  findAll(): Promise<ChallengePost[]>;
  delete(id: string): Promise<DeleteResult>;
}
