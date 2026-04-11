import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmChallengePostRepository } from '../repositories/challengePosts.repository';
import { ChallengePostRepository } from '../interfaces/challengePosts.interface';
import { CreateChallengePostDto } from '../dto/createChallengePost.dto';
import { ENotFoundException } from 'src/global/exceptions/ENotFoundException';
import { ERROR_CODE } from 'src/global/constant/errorCode.constant';

@Injectable()
export class ChallengePostsService {
  constructor(
    @Inject(TypeOrmChallengePostRepository)
    private readonly challengePostRepo: ChallengePostRepository,
  ) {}

  // TODO: VerificationService 연동 -> 공통 인증 기록 생성 및 챌린지 포스트 연결
  async create(createChallengePostDto: CreateChallengePostDto) {
    return this.challengePostRepo.create(createChallengePostDto);
  }

  async findOne(challengePostId: string) {
    const challengePost =
      await this.challengePostRepo.findOneById(challengePostId);

    if (!challengePost) throw new ENotFoundException({
            message: '존재하지 않는 챌린지 포스트 정보입니다.',
            errorCode: ERROR_CODE.CHALLENGE_POST_NOT_FOUND,
          });;

    return challengePost;
  }

  async findAll() {
    return this.challengePostRepo.findAll();
  }

  async delete(challengePostId: string) {
    const result = await this.challengePostRepo.delete(challengePostId);

    if (result.affected === 0) {
      throw new ENotFoundException({
            message: '존재하지 않는 챌린지 포스트 정보입니다.',
            errorCode: ERROR_CODE.CHALLENGE_POST_NOT_FOUND,
          });;
    }
  }
}
