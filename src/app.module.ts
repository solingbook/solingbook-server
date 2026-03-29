import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigsModule } from './configs/configs.module';
import { User } from './users/user.entity';
import { TypedConfigService } from './configs/typedConfig.service';
import { validate } from './configs/env.validaion';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/report.entity';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { ReviewsModule } from './reviews/reviews.module';
import { BooksModule } from './books/books.module';
import { ChallengesModule } from './challenges/challenges.module';
import { VerificationModule } from './verifications/verifications.module';
import { ServiceLogsModule } from './service-logs/service-logs.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServiceLogInterceptor } from './global/interceptors/serviceLog.interceptor';
import { AuthModule } from './auth/auth.module';
import { TokenRefreshInterceptor } from './global/interceptors/tokenRefresh.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
      ],
    }),

    ConfigsModule,

    TypeOrmModule.forRootAsync({
      inject: [TypedConfigService],
      useFactory: (config: TypedConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User, Report],
        synchronize: config.get('DB_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        return addTransactionalDataSource(dataSource);
      },
    }),

    EventEmitterModule.forRoot(),

    UsersModule,
    ReportsModule,
    ReviewsModule,
    BooksModule,
    ChallengesModule,
    VerificationModule,
    ServiceLogsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ServiceLogInterceptor, TokenRefreshInterceptor],
})
export class AppModule {}
