import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmChallengeRepository } from './challenges.repository';
import { CreateChallengeDto } from './dto/createChallenge.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @Inject(TypeOrmChallengeRepository)
    private readonly challengeRepo: TypeOrmChallengeRepository,
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
}
