import { IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  // TODO: check phone number validation
  @IsString()
  readonly phone: string;

  @IsEmail()
  readonly email: string;
}