import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { TypeOrmChallengeRepository } from './challenges.repository';
import { CreateChallengeDto } from './dto/createChallenge.dto';
import { CreateChallengeResultDto } from './dto/createChallengeResult.dto';
import { TypeOrmChallengeResultRepository } from './challengeResults.repository';
import { ENotFoundException } from 'src/global/exceptions/ENotFoundException';
import { ERROR_CODE } from 'src/global/constant/errorCode.constant';
import { EConflictException } from 'src/global/exceptions/EConflictException';

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

    if (!challenge) throw new ENotFoundException({
            message: '존재하지 않는 챌린지 정보입니다.',
            errorCode: ERROR_CODE.CHALLENGE_NOT_FOUND,
          });;

    return challenge;
  }

  async delete(challengeId: string) {
    const result = await this.challengeRepo.delete(challengeId);

    if (result.affected === 0) {
      throw new ENotFoundException({
        message: '존재하지 않는 챌린지 정보입니다.',
        errorCode: ERROR_CODE.CHALLENGE_NOT_FOUND,
      });;
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
      throw new EConflictException({
        message: '이미 챌린지 결과가 존재합니다.',
        errorCode: ERROR_CODE.CHALLENGE_RESULT_ALREADY_EXISTS,
      });
    }
    return await this.resultRepo.createResult(resultDto);
  }

  async getResultByProgressId(progressId: string) {
    const result = await this.resultRepo.findByProgressId(progressId);
    if (!result) throw new ENotFoundException({
            message: '존재하지 않는 챌린지 결과 정보입니다.',
            errorCode: ERROR_CODE.CHALLENGE_RESULT_NOT_FOUND,
          });;
    return result;
  }
}
