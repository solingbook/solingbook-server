import { DeleteResult } from 'typeorm';
import { CreateEssayDto } from '../dto/createEssay.dto';
import { Essay } from '../entity/essay.entity';

export interface EssayRepository {
  create(createEssayDto: CreateEssayDto): Promise<Essay>;
  findOneById(id: string): Promise<Essay | null>;
  findOneByWriterId(writerId: string): Promise<Essay | null>;
  findAll(): Promise<Essay[]>;
  delete(id: string): Promise<DeleteResult>;
}
