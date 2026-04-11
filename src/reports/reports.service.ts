import { Inject, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/createReport.dto';
import { GetReportQueryDto } from './dto/gerReportQuery.dto';
import { TypeOrmReportRepository } from './reports.repository';
import { ReportRepository } from './reports.interface';
import { TypeOrmUserRepository } from 'src/users/users.repository';
import { UserRepository } from 'src/users/users.interface';
import { ReportTargetType } from './constant/reportTargetType.enum';
import { Transactional } from 'typeorm-transactional';
import { ENotFoundException } from 'src/global/exceptions/ENotFoundException';
import { ERROR_CODE } from 'src/global/constant/errorCode.constant';

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

    if (targetType === ReportTargetType.USER) {
      const user = await this.userRepo.findUser({
        where: { userId: targetId },
      });

      if (!user) throw new ENotFoundException({
            message: '존재하지 않는 사용자 정보입니다.',
            errorCode: ERROR_CODE.USER_NOT_FOUND,
          });;
    }

    // TODO: Post 테이블 생성 후 Post도 검증하기
    // if (targetType === TargetType.POST){}

    return this.reportRepo.create(createReportDto);
  }

  async findOne(reportId: string, query: GetReportQueryDto) {
    const report = await this.reportRepo.findOne(reportId, query);

    if (!report) throw new ENotFoundException({
            message: '존재하지 않는 신고 정보입니다.',
            errorCode: ERROR_CODE.REPORT_NOT_FOUND,
          });;

    return report;
  }

  async findAll() {
    return this.reportRepo.findAll();
  }

  async delete(userId: string) {
    await this.reportRepo.delete(userId);
  }
}
