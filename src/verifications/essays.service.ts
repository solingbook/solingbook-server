import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmEssayRepository } from './essays.repository';
import { CreateEssayDto } from './dto/createEssay.dto';
import { EssayRepository } from './essays.interface';

@Injectable()
export class EssaysService {
  constructor(
    @Inject(TypeOrmEssayRepository)
    private readonly essayRepo: EssayRepository,
  ) {}

  async create(createEssayDto: CreateEssayDto) {
    return this.essayRepo.create(createEssayDto);
  }

  async findOne(essayId: string) {
    const challengePost = await this.essayRepo.findOneById(essayId);

    if (!challengePost) throw new NotFoundException('Essay not found');

    return challengePost;
  }

  async findAll() {
    return this.essayRepo.findAll();
  }

  async delete(essayId: string) {
    const result = await this.essayRepo.delete(essayId);

    if (result.affected === 0) {
      throw new NotFoundException('Essay not found');
    }
  }
}
