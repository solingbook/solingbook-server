import { DeleteResult } from 'typeorm';
import { CreateReportDto } from './dto/createReport.dto';
import { PostsQueryDto } from './dto/gerReportQuery.dto';
import { Report } from './report.entity';

export interface ReportRepository {
  create(report: CreateReportDto): Promise<Report>;
  findOne(reportId: string, query: PostsQueryDto): Promise<Report>;
  findAll(): Promise<Report[]>;
  delete(reportId: string): Promise<DeleteResult>;
}
