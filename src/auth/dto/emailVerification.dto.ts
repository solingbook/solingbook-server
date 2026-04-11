import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { EmailVerificationPurpose } from '../constant/emailVerificationPurpose.enum';

export class EmailVerificationDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsEnum(EmailVerificationPurpose)
  purpose: EmailVerificationPurpose;
}
