import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmChallengePostRepository } from '../repositories/challengePosts.repository';
import { ChallengePostRepository } from '../interfaces/challengePosts.interface';
import { CreateChallengePostDto } from '../dto/createChallengePost.dto';

@Injectable()
export class ChallengePostsService {
  constructor(
    @Inject(TypeOrmChallengePostRepository)
    private readonly challengePostRepo: ChallengePostRepository,
  ) {}

  async create(createChallengePostDto: CreateChallengePostDto) {
    return this.challengePostRepo.create(createChallengePostDto);
  }

  async findOne(postId: string) {
    const challengePost = await this.challengePostRepo.findOneById(postId);

    if (!challengePost) throw new NotFoundException('Challenge Post not found');

    return challengePost;
  }

  async findAll() {
    return this.challengePostRepo.findAll();
  }

  async delete(postId: string) {
    const result = await this.challengePostRepo.delete(postId);

    if (result.affected === 0) {
      throw new NotFoundException('Challenge Post not found');
    }
  }
}
