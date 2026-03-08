import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { VerificationRulesService } from '../services/verificationRules.service';
import { VerificationRule } from '../entity/verificationRule.entity';
import { CreateVerificationRuleDto } from '../dto/createVerificationRule.dto';

@Controller('verificationRules')
export class VerificationRulesController {
  constructor(
    private readonly verificationRulesService: VerificationRulesService,
  ) {}

  @Get()
  async findAll(): Promise<VerificationRule[]> {
    return this.verificationRulesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) verificationRuleId: string,
  ): Promise<VerificationRule> {
    return this.verificationRulesService.findOne(verificationRuleId);
  }

  @Post()
  async create(@Body() createVerificationRuleDto: CreateVerificationRuleDto) {
    return this.verificationRulesService.create(createVerificationRuleDto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) verificationRuleId: string) {
    return this.verificationRulesService.delete(verificationRuleId);
  }
}
