import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressRepository } from './progress.interface';
import { Progress } from './entity/progress.entity';

@Injectable()
export class TypeOrmProgressRepository implements ProgressRepository {
  constructor(
    @InjectRepository(Progress)
    private readonly repo: Repository<Progress>,
  ) {}

  async create(progress: Partial<Progress>) {
    const newProgress = this.repo.create(progress);

    return this.repo.save(newProgress);
  }

  async findOneById(progressId: string): Promise<Progress | null> {
    return this.repo.findOneBy({ progressId });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(progressId: string) {
    return this.repo.delete({ progressId });
  }
}
