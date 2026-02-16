import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Report } from './report.entity';
import { ReportRepository } from './reports.interface';
import { CreateReportDto } from './dto/createReport.dto';
import { PostsQueryDto } from './dto/gerReportQuery.dto';

@Injectable()
export class TypeOrmReportRepository implements ReportRepository {
  constructor(
    @InjectRepository(Report)
    private readonly repo: Repository<Report>,
  ) {}

  async create(report: CreateReportDto) {
    const newReport = this.repo.create(report);

    return this.repo.save(newReport);
  }

  async findOne(reportId: string, query: PostsQueryDto) {
    const relations = query.withUserInfo ? ['reporter'] : [];

    return this.repo.findOne({ where: { reportId }, relations });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(reportId: string) {
    return this.repo.delete({ reportId });
  }
}
