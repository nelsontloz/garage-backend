import { prop, Typegoose } from 'typegoose';
import { IsString, IsEmail, IsPhoneNumber, IsMongoId, IsOptional } from 'class-validator';

export default class Customer extends Typegoose {

    @IsMongoId()
    @IsOptional()
    _id: string;

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
    @prop({
        index: true,
        unique: true,
        required: true,
    })
    email: string;
}
