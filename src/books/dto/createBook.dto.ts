import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  totalPages: number;
}
