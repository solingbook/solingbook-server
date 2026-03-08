import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateChallengePostDto {
  @IsUUID()
  @IsNotEmpty()
  writerId: string;

  @IsUUID()
  @IsNotEmpty()
  progressId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pageNo: number;

  @IsOptional()
  @IsString()
  postImageUrl: string;
}
