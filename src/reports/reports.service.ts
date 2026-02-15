import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/createReport.dto';
import { PostsQueryDto } from './dto/gerReportQuery.dto';
import { TypeOrmReportRepository } from './reports.repository';
import { ReportRepository } from './reports.interface';
import { TypeOrmUserRepository } from 'src/users/users.repository';
import { UserRepository } from 'src/users/users.interface';
import { TargetType } from './constant/targetType.enum';
import { Transactional } from 'typeorm-transactional';
import { delay } from 'src/util/time.util';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(TypeOrmReportRepository)
    private readonly reportRepo: ReportRepository,
    @Inject(TypeOrmUserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  // TODO: 인증/인가 작업 후 reporterId 입력 로직 보완하기
  @Transactional()
  async create(createReportDto: CreateReportDto) {
    const { targetId, targetType } = createReportDto;

    if (targetType === TargetType.USER) {
      const user = await this.userRepo.findOneById(targetId);

      if (!user) throw new NotFoundException('User not found');
    }

    // TODO: Post 테이블 생성 후 Post도 검증하기
    // if (targetType === TargetType.POST){}

    await delay(6000 * 10);

    return this.reportRepo.create(createReportDto);
  }

  async findOne(reportId: string, query: PostsQueryDto) {
    const report = await this.reportRepo.findOne(reportId, query);

    if (!report) throw new NotFoundException('Report not found');

    return report;
  }

  async findAll() {
    return this.reportRepo.findAll();
  }

  async delete(userId: string) {
    await this.reportRepo.delete(userId);
  }
}
