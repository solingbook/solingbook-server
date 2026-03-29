import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/createChallenge.dto';
import { CreateChallengeResultDto } from './dto/createChallengeResult.dto';
import { ChallengeResults } from './entity/challengeResult.entity';
import { Challenge } from './entity/challenge.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('challenges')
@UseGuards(JwtAuthGuard)
export class ChallengesController {
  constructor(private readonly challengeService: ChallengesService) {}

  @Get()
  async findAll(): Promise<Challenge[]> {
    return this.challengeService.findAll();
  }

  @Get('results')
  async findAllResults(): Promise<ChallengeResults[]> {
    return this.challengeService.findAllResults();
  }

  @Get('results/:progressId')
  async findByProgressId(
    @Param('progressId', new ParseUUIDPipe()) progressId: string,
  ): Promise<ChallengeResults> {
    return this.challengeService.getResultByProgressId(progressId);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) challengeId: string,
  ): Promise<Challenge> {
    return this.challengeService.findOneById(challengeId);
  }

  @Post()
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create(createChallengeDto);
  }

  @Post('results')
  async createResult(@Body() createResultDto: CreateChallengeResultDto) {
    return this.challengeService.createResult(createResultDto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.challengeService.delete(id);
  }
}
