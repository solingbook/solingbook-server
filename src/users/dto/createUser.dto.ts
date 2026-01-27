import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
