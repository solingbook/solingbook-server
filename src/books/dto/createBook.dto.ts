import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsOptional()
  isbn: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  @IsInt()
  totalPages: number;

  @IsOptional()
  @IsString()
  thumbImgUrl: string;
}
