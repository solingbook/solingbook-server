import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

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

  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  postEnabled: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  postRequiredCount: number;

  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  essayEnabled: boolean;
}
