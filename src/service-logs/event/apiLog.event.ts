import { CreateApiLogDto } from '../dto/createApiLog.dto';

export class CreateApiLogEvent {
  constructor(public readonly dto: CreateApiLogDto) {}
}
