import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Phase } from '../constant/phase.enum';

export class CreateChallengeDto {
  @IsUUID()
  @IsNotEmpty()
  creatorId: string;

  // TODO: Optional 제거, UUID 검증 추가하기
  // @IsUUID()
  // @IsNotEmpty()
  @IsOptional()
  bookId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsEnum(Phase)
  phase: Phase;

  @Type(() => Number)
  @IsNumber()
  @Min(3)
  @Max(30)
  @IsNotEmpty()
  maxParticipants: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  recruitEndDate: Date;

  @Type(() => Number)
  @IsNumber()
  @Min(5)
  @Max(365)
  @IsNotEmpty()
  durationDays: number;
}
