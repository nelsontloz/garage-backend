import { Typegoose } from 'typegoose';
import { IsString, IsEmail } from 'class-validator';

export default class AccountCreation extends Typegoose {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
