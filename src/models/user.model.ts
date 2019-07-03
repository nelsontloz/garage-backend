import { Typegoose, prop, Ref } from 'typegoose';
import { IsString, IsEmail, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import Customer from './customer.model';

export enum UserType {
    CUSTOMER = 'customer',
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
}

export default class User extends Typegoose {

    @IsMongoId()
    @IsOptional()
    _id: string;

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

    @IsEnum(UserType)
    @prop({
        required: true,
        enum: Object.values(UserType),
    })
    type: UserType;

    @IsMongoId()
    @IsOptional()
    @prop({ ref: Customer })
    customer: Ref<Customer>;
}
