import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TypeOrmChallengeRepository } from './challenges.repository';
import { CreateChallengeDto } from './dto/createChallenge.dto';
import { CreateChallengeResultDto } from './dto/createChallengeResult.dto';
import { TypeOrmChallengeResultRepository } from './challengeResults.repository';

@Injectable()
export class ChallengesService {
  constructor(
    @Inject(TypeOrmChallengeRepository)
    private readonly challengeRepo: TypeOrmChallengeRepository,
    @Inject(TypeOrmChallengeResultRepository)
    private readonly resultRepo: TypeOrmChallengeResultRepository,
  ) {}

  async create(dto: CreateChallengeDto) {
    const endDate = new Date(dto.recruitEndDate);
    endDate.setDate(endDate.getDate() + dto.durationDays);

    return await this.challengeRepo.create({
      ...dto,
      endDate,
    });
  }

  async findAll() {
    return this.challengeRepo.findAll();
  }

  async findOneById(challengeId: string) {
    const challenge = await this.challengeRepo.findOneById(challengeId);

    if (!challenge) throw new NotFoundException('Challenge not found');

    return challenge;
  }

  async delete(challengeId: string) {
    const result = await this.challengeRepo.delete(challengeId);

    if (result.affected === 0) {
      throw new NotFoundException('Challenge not found');
    }
  }

  async findAllResults() {
    return this.resultRepo.findAllResults();
  }

  async createResult(resultDto: CreateChallengeResultDto) {
    const existingResult = await this.resultRepo.findByProgressId(
      resultDto.progressId,
    );

    if (existingResult) {
      throw new ConflictException(
        'A challenge result already exists for this progressId',
      );
    }
    return await this.resultRepo.createResult(resultDto);
  }

  async getResultByProgressId(progressId: string) {
    const result = await this.resultRepo.findByProgressId(progressId);
    if (!result) throw new NotFoundException('Challenge result not found');
    return result;
  }
}
