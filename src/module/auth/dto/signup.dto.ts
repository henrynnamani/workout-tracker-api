import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 4,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
