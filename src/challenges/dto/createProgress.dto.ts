import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { transformBoolean } from 'src/util/classValidator.util';

export class CreateProgressDto {
  @IsUUID()
  @IsNotEmpty()
  participantId: string;

  @IsUUID()
  @IsNotEmpty()
  challengeId: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalReadMins: number;

  @IsBoolean()
  @Transform(transformBoolean)
  isDoneRead: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  doneReadAt: Date;

  @IsBoolean()
  @Transform(transformBoolean)
  isDoneTime: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  doneTimeAt: Date;

  @IsBoolean()
  @Transform(transformBoolean)
  isDonePost: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  donePostAt: Date;

  @IsOptional()
  @IsInt()
  pageNo: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  pageNoUpdatedAt: Date;

  @IsBoolean()
  @Transform(transformBoolean)
  isDoneEssay: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  doneEssayAt: Date;

  @IsBoolean()
  @Transform(transformBoolean)
  isCompleted: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  completedAt: Date;
}
