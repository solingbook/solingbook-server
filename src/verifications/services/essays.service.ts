import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmEssayRepository } from '../repositories/essays.repository';
import { EssayRepository } from '../interfaces/essays.interface';
import { CreateEssayDto } from '../dto/createEssay.dto';

@Injectable()
export class EssaysService {
  constructor(
    @Inject(TypeOrmEssayRepository)
    private readonly essayRepo: EssayRepository,
  ) {}

  // TODO: VerificationService 연동 -> 인증 기록 생성 및 에세이 연결
  async create(createEssayDto: CreateEssayDto) {
    return this.essayRepo.create(createEssayDto);
  }

  async findOne(essayId: string) {
    const essay = await this.essayRepo.findOneById(essayId);

    if (!essay) throw new NotFoundException('Essay not found');

    return essay;
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
