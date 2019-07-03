import { prop, Typegoose } from 'typegoose';
import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export default class Customer extends Typegoose {

    @IsString()
    @prop({ required: true })
    firstName: string;

    @IsString()
    @prop({ required: true })
    lastName: string;

    @IsPhoneNumber('IE')
    @prop()
    phone: string;

    @IsEmail()
    @prop({
        index: true,
        unique: true,
        required: true,
    })
    email: string;
}
