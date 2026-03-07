import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from '../entity/verification.entity';
import { Repository } from 'typeorm';
import { CreateVerificationDto } from '../dto/createVerification.dto';
import { VerificationRepository } from '../interfaces/verifications.interface';

@Injectable()
export class TypeOrmVerificationRepository implements VerificationRepository {
  constructor(
    @InjectRepository(Verification)
    private readonly repo: Repository<Verification>,
  ) {}

  async create(createVerificationDto: CreateVerificationDto) {
    const newChallengePost = this.repo.create(createVerificationDto);

    return this.repo.save(newChallengePost);
  }

  async findOneById(verificationId: string): Promise<Verification | null> {
    return this.repo.findOneBy({ verificationId });
  }

  async findAllByProgressId(progressId: string): Promise<Verification[]> {
    return this.repo.findBy({ progressId });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(verificationId: string) {
    return this.repo.delete({ verificationId });
  }
}
