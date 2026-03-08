import { Module } from '@nestjs/common';
import { ServiceLogsController } from './service-logs.controller';
import { ServiceLogsService } from './service-logs.service';
import { ApiLogListener } from './event/apiLogListener';
import { TypeOrmApiLogRepository } from './apiLogs.repository';
import { ApiLog } from './apiLog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ApiLog])],
  exports: [ServiceLogsService, TypeOrmApiLogRepository],
  providers: [ServiceLogsService, TypeOrmApiLogRepository, ApiLogListener],
  controllers: [ServiceLogsController],
})
export class ServiceLogsModule {}
