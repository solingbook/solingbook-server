import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { ReviewTargetType } from '../constant/ReviewTargetType.enum';

export class CreateReviewDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  reviewerId: string;

  @IsEnum(ReviewTargetType)
  @IsDefined()
  @IsNotEmpty()
  targetType: ReviewTargetType;

  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  targetId: string;

  @IsInt()
  @Transform(() => Number)
  @Min(0)
  @Max(5)
  @IsDefined()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsOptional()
  content: string;
}
