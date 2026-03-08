import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { transformBoolean } from 'src/util/classValidator.util';

export class CreateVerificationRuleDto {
  @IsUUID()
  @IsNotEmpty()
  challengeId: string;

  @Type(() => Number)
  @IsInt()
  timerDailyMinutes: number;

  @Type(() => Number)
  @IsInt()
  timerRequiredDays: number;

  @Transform(transformBoolean)
  @IsBoolean()
  postEnabled: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  postRequiredCount: number;

  @Transform(transformBoolean)
  @IsBoolean()
  essayEnabled: boolean;
}
