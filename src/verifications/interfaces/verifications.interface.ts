import { DeleteResult } from 'typeorm';
import { Verification } from '../entity/verification.entity';
import { CreateVerificationDto } from '../dto/createVerification.dto';

export interface VerificationRepository {
  create(createVerificationDto: CreateVerificationDto): Promise<Verification>;
  findOneById(id: string): Promise<Verification | null>;
  findAllByProgressId(progressId: string): Promise<Verification[]>;
  findAll(): Promise<Verification[]>;
  delete(id: string): Promise<DeleteResult>;
}
