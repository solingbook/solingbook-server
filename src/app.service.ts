import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(readonly configService: ConfigService) {}

  getHello(): string {
    console.log('env', this.configService.get('DB_TYPE'));
    return 'Hello World!';
  }
}
