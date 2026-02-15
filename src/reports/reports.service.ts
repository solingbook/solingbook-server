import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dto/createReport.dto';
import { PostsQueryDto } from './dto/gerReportQuery.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const user = this.reportsRepository.create(createReportDto);

    return this.reportsRepository.save(user);
  }

  async findAll() {
    return this.reportsRepository.find();
  }

  async findOne(reportId: string, query: PostsQueryDto) {
    const relations = query.withUserInfo ? ['reporter'] : [];

    const user = await this.reportsRepository.findOne({
      where: { reportId },
      relations,
    });

    if (!user) throw new NotFoundException('Report not found');

    return user;
  }

  async remove(id: string) {
    await this.reportsRepository.delete({ reportId: id });
  }
}
