import { DeleteResult } from 'typeorm';
import { CreateApiLogDto } from './dto/createApiLog.dto';
import { ApiLog } from './apiLog.entity';

export interface ApiLogRepository {
  create(createApliLogDto: CreateApiLogDto): Promise<ApiLog>;
  findOneById(id: bigint): Promise<ApiLog | null>;
  findAll(): Promise<ApiLog[]>;
  delete(id: bigint): Promise<DeleteResult>;
}
