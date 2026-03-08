import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { CreateApiLogEvent } from './apiLog.event';
import { ServiceLogsService } from '../service-logs.service';
import { EVENT_KEY } from 'src/global/constant/event.constant';

@Injectable()
export class ApiLogListener {
  constructor(private readonly serviceLogService: ServiceLogsService) {}

  @OnEvent(EVENT_KEY.CREATE_API_LOG, { async: true })
  async handleCreateApiLog(event: CreateApiLogEvent) {
    try {
      await this.serviceLogService.createLog(event.dto);
    } catch (err) {
      console.error(err);
    }
  }
}
