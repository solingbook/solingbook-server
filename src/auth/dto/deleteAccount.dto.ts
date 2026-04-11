import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class DeleteAccountDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  deletionReason: string;
}
