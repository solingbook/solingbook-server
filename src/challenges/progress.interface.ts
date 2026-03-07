import { DeleteResult } from 'typeorm';
import { Progress } from './entity/progress.entity';
import { CreateProgressDto } from './dto/createProgress.dto';

export interface ProgressRepository {
  create(progress: CreateProgressDto): Promise<Progress>;
  findOneById(id: string): Promise<Progress | null>;
  findAll(): Promise<Progress[]>;
  delete(id: string): Promise<DeleteResult>;
}
