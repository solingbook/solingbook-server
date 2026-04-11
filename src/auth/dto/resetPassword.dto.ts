import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  newPassword: string;
}
