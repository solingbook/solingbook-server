import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypedConfigService } from './configs/typedConfig.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(TypedConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
