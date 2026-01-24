import { Module } from '@nestjs/common';
import { TypedConfigService } from './typedConfig.service';

@Module({
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class ConfigsModule {}
