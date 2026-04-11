import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmEssayRepository } from '../repositories/essays.repository';
import { EssayRepository } from '../interfaces/essays.interface';
import { CreateEssayDto } from '../dto/createEssay.dto';
import { ENotFoundException } from 'src/global/exceptions/ENotFoundException';
import { ERROR_CODE } from 'src/global/constant/errorCode.constant';

@Injectable()
export class EssaysService {
  constructor(
    @Inject(TypeOrmEssayRepository)
    private readonly essayRepo: EssayRepository,
  ) {}

  // TODO: VerificationService 연동 -> 인증 기록 생성 및 서평 연결
  async create(createEssayDto: CreateEssayDto) {
    return this.essayRepo.create(createEssayDto);
  }

  async findOne(essayId: string) {
    const essay = await this.essayRepo.findOneById(essayId);

    if (!essay) throw new ENotFoundException({
            message: '존재하지 않는 서평 정보입니다.',
            errorCode: ERROR_CODE.ESSAY_NOT_FOUND,
          });;

    return essay;
  }

  async findAll() {
    return this.essayRepo.findAll();
  }

  async delete(essayId: string) {
    const result = await this.essayRepo.delete(essayId);

    if (result.affected === 0) {
      throw new ENotFoundException({
            message: '존재하지 않는 서평 정보입니다.',
            errorCode: ERROR_CODE.ESSAY_NOT_FOUND,
          });;
    }
  }
}
