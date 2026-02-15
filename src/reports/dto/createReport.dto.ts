import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { TargetType } from '../constant/targetType.enum';

export class CreateReportDto {
  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  reporterId: string;

  @IsEnum(TargetType)
  @IsDefined()
  @IsNotEmpty()
  targetType: TargetType;

  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  targetId: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  reason: string;
}
