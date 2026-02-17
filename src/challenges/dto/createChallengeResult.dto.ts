import { IsEnum, IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { Status } from '../constant/status.enum';
import { Type } from 'class-transformer';

export class CreateChallengeResultDto {
  @IsUUID()
  @IsNotEmpty()
  progressId: string;

  @IsEnum(Status)
  @IsNotEmpty()
  resultStatus: Status;

  @Type(() => Number)
  @IsInt()
  earnedExpPoints: number;

  @Type(() => Number)
  @IsInt()
  earnedConPoints: number;
}
