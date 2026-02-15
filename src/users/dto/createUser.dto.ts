import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '../constant/role.enum';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @Transform(({ value }) => value ?? UserRole.MEMBER)
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  profileImgUrl: string;
}
