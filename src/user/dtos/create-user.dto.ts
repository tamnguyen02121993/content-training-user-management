import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  globalId: string;

  @IsNotEmpty()
  @MaxLength(50)
  officeCode: string;

  @IsNotEmpty()
  country: string;

  isPending?: boolean;
  isDisable?: boolean;
}
