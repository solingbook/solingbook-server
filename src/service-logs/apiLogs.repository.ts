import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiLogRepository } from './apiLogs.interface';
import { ApiLog } from './apiLog.entity';
import { CreateApiLogDto } from './dto/createApiLog.dto';

@Injectable()
export class TypeOrmApiLogRepository implements ApiLogRepository {
  constructor(
    @InjectRepository(ApiLog)
    private readonly repo: Repository<ApiLog>,
  ) {}

  async create(createApiLogDto: CreateApiLogDto) {
    const newLog = this.repo.create(createApiLogDto);

    return this.repo.save(newLog);
  }

  async findOneById(id: bigint): Promise<ApiLog | null> {
    return this.repo.findOneBy({ id });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(id: bigint) {
    return this.repo.delete({ id });
  }
}
