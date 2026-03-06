import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Essay } from './entity/essay.entity';
import { Repository } from 'typeorm';
import { CreateEssayDto } from './dto/createEssay.dto';
import { EssayRepository } from './essays.interface';

@Injectable()
export class TypeOrmEssayRepository implements EssayRepository {
  constructor(
    @InjectRepository(Essay)
    private readonly repo: Repository<Essay>,
  ) {}

  async create(createEssayDto: CreateEssayDto) {
    const newChallengePost = this.repo.create(createEssayDto);

    return this.repo.save(newChallengePost);
  }

  async findOneById(essayId: string): Promise<Essay | null> {
    return this.repo.findOneBy({ essayId });
  }

  async findOneByWriterId(writerId: string): Promise<Essay | null> {
    return this.repo.findOneBy({ writerId });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(essayId: string) {
    return this.repo.delete({ essayId });
  }
}
