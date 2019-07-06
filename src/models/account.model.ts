import { Typegoose, prop } from 'typegoose';
import { IsString, IsEmail, IsMongoId, IsOptional, IsEnum } from 'class-validator';

export enum AccountType {
    CUSTOMER = 'customer',
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
}

export default class Account extends Typegoose {

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
        required: true,
        unique: true,
        index: true,
    })
    email: string;

    @IsString()
    @prop({
        required: true,
    })
    password: string;

    @IsEnum(AccountType)
    @prop({
        required: true,
        enum: Object.values(AccountType),
    })
    type: AccountType;
}
