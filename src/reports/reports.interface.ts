import { DeleteResult } from 'typeorm';
import { CreateReportDto } from './dto/createReport.dto';
import { GetReportQueryDto } from './dto/gerReportQuery.dto';
import { Report } from './report.entity';

export interface ReportRepository {
  create(createReportDto: CreateReportDto): Promise<Report>;
  findOne(reportId: string, query: GetReportQueryDto): Promise<Report>;
  findAll(): Promise<Report[]>;
  delete(reportId: string): Promise<DeleteResult>;
}
