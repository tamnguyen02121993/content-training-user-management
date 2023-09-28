import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
