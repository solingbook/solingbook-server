import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';
import { CreateReportDto } from './dto/createReport.dto';
import { GetReportQueryDto } from './dto/gerReportQuery.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async findAll(): Promise<Report[]> {
    return this.reportsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) reportId: string,
    @Query() query: GetReportQueryDto,
  ): Promise<Report> {
    return this.reportsService.findOne(reportId, query);
  }

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reportsService.delete(id);
  }
}
