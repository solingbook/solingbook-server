import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { TypeOrmReportRepository } from './reports.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), UsersModule],
  exports: [TypeOrmModule, TypeOrmReportRepository],
  providers: [ReportsService, TypeOrmReportRepository],
  controllers: [ReportsController],
})
export class ReportsModule {}
