import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  description: string;
}
