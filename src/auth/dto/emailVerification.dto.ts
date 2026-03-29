import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailVerificationDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;
}
