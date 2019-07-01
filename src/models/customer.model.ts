import { prop, Typegoose } from 'typegoose';
import { IsString, IsEmail } from 'class-validator';

export default class Customer extends Typegoose {

    @IsString()
    @prop({ required: true })
    firstName: string;

    @IsString()
    @prop({ required: true })
    lastName: string;

    @IsString()
    @prop()
    phone: string;

    @IsEmail()
    @prop({ required: true })
    email: string;
}
