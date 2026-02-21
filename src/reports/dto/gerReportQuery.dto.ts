import { IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { transformBoolean } from 'src/util/classValidator.util';

export class GetReportQueryDto {
  @IsBoolean()
  @Transform(transformBoolean)
  @IsOptional()
  withUserInfo?: boolean;
}
