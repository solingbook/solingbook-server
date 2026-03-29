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
import { EssaysService } from '../services/essays.service';
import { Essay } from '../entity/essay.entity';
import { CreateEssayDto } from '../dto/createEssay.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('essays')
@UseGuards(JwtAuthGuard)
export class EssaysController {
  constructor(private readonly essaysService: EssaysService) {}

  @Get()
  async findAll(): Promise<Essay[]> {
    return this.essaysService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) essayId: string,
  ): Promise<Essay> {
    return this.essaysService.findOne(essayId);
  }

  @Post()
  async create(@Body() createEssayDto: CreateEssayDto) {
    return this.essaysService.create(createEssayDto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) essayId: string) {
    return this.essaysService.delete(essayId);
  }
}
