import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ReportTargetType } from '../constant/reportTargetType.enum';

export class CreateReportDto {
  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  reporterId: string;

  @IsEnum(ReportTargetType)
  @IsDefined()
  @IsNotEmpty()
  targetType: ReportTargetType;

  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  targetId: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  reason: string;
}
