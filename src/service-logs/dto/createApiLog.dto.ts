import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateApiLogDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  userId: string | null;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  endpoint: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  statusCode: number;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  responseTimeMs: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  ipAddress: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userAgent: string;
}
