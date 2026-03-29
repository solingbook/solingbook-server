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
import { ChallengePostsService } from '../services/challengePosts.service';
import { ChallengePost } from '../entity/challengePost.entity';
import { CreateChallengePostDto } from '../dto/createChallengePost.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('challengePosts')
@UseGuards(JwtAuthGuard)
export class ChallengePostsController {
  constructor(private readonly challengePostsService: ChallengePostsService) {}

  @Get()
  async findAll(): Promise<ChallengePost[]> {
    return this.challengePostsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) challengePostId: string,
  ): Promise<ChallengePost> {
    return this.challengePostsService.findOne(challengePostId);
  }

  @Post()
  async create(@Body() createChallengePostDto: CreateChallengePostDto) {
    return this.challengePostsService.create(createChallengePostDto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) challengePostId: string) {
    return this.challengePostsService.delete(challengePostId);
  }
}
