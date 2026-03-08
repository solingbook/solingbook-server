import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmApiLogRepository } from './apiLogs.repository';
import { ApiLogRepository } from './apiLogs.interface';
import { CreateApiLogDto } from './dto/createApiLog.dto';

@Injectable()
export class ServiceLogsService {
  constructor(
    @Inject(TypeOrmApiLogRepository)
    private readonly apiLogRepo: ApiLogRepository,
  ) {}

  async createLog(createApiLogDto: CreateApiLogDto) {
    await this.apiLogRepo.create(createApiLogDto);
  }
}
