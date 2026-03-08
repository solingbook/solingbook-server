import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { transformBoolean } from 'src/util/classValidator.util';

export class CreateEssayDto {
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

  @IsBoolean()
  @Transform(transformBoolean)
  isPublic: boolean;
}
