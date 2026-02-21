import { CreateChallengeResultDto } from './dto/createChallengeResult.dto';
import { ChallengeResults } from './entity/challengeResult.entity';

export interface ChallengeResultRepository {
  createResult(challenge: CreateChallengeResultDto): Promise<ChallengeResults>;
  findAllResults(): Promise<ChallengeResults[]>;
  findByProgressId(id: string): Promise<ChallengeResults | null>;
}
