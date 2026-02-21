import { IsEnum, IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { ChallengeResultStatus } from '../constant/status.enum';
import { Type } from 'class-transformer';

export class CreateChallengeResultDto {
  @IsUUID()
  @IsNotEmpty()
  progressId: string;

  @IsEnum(ChallengeResultStatus)
  @IsNotEmpty()
  challengeResultStatus: ChallengeResultStatus;

  @Type(() => Number)
  @IsInt()
  earnedExpPoints: number;

  @Type(() => Number)
  @IsInt()
  earnedConPoints: number;
}
