import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nickname: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  profileImgUrl?: string;
}
