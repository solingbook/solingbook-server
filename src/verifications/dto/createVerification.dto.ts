import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { VerificationType } from '../constant/verificationType.enum';

export class CreateVerificationDto {
  @IsUUID()
  @IsNotEmpty()
  progressId: string;

  @IsEnum(VerificationType)
  @IsNotEmpty()
  verificationType: VerificationType;
}
