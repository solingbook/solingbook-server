import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengePostRepository } from '../interfaces/challengePosts.interface';
import { ChallengePost } from '../entity/challengePost.entity';
import { CreateChallengePostDto } from '../dto/createChallengePost.dto';

@Injectable()
export class TypeOrmChallengePostRepository implements ChallengePostRepository {
  constructor(
    @InjectRepository(ChallengePost)
    private readonly repo: Repository<ChallengePost>,
  ) {}

  async create(createChallengePostDto: CreateChallengePostDto) {
    const newChallengePost = this.repo.create(createChallengePostDto);

    return this.repo.save(newChallengePost);
  }

  async findOneById(postId: string): Promise<ChallengePost | null> {
    return this.repo.findOneBy({ postId });
  }

  async findOneByWriterId(writerId: string): Promise<ChallengePost | null> {
    return this.repo.findOneBy({ writerId });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(postId: string) {
    return this.repo.delete({ postId });
  }
}
