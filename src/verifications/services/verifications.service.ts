import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmVerificationRepository } from '../repositories/verifications.repository';
import { VerificationRepository } from '../interfaces/verifications.interface';
import { CreateVerificationDto } from '../dto/createVerification.dto';
@Injectable()
export class VerificationsService {
  constructor(
    @Inject(TypeOrmVerificationRepository)
    private readonly verificationRepo: VerificationRepository,
  ) {}

  async create(createVerificationDto: CreateVerificationDto) {
    return this.verificationRepo.create(createVerificationDto);
  }

  async findOneById(verificationId: string) {
    const verification =
      await this.verificationRepo.findOneById(verificationId);

    if (!verification) throw new NotFoundException('Verification not found');

    return verification;
  }

  async findAllByProgressId(progressId: string) {
    const verification =
      await this.verificationRepo.findAllByProgressId(progressId);

    if (!verification) throw new NotFoundException('Verification not found');

    return verification;
  }

  async findAll() {
    return this.verificationRepo.findAll();
  }

  async delete(verificationId: string) {
    const result = await this.verificationRepo.delete(verificationId);

    if (result.affected === 0) {
      throw new NotFoundException('Verification not found');
    }
  }
}
