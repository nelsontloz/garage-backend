import { Typegoose, prop, Ref } from 'typegoose';
import { IsString, IsEnum, IsMongoId } from 'class-validator';
import Customer from './customer.model';

export enum EngineType {
    DIESEL = 'diesel',
    PRETROL = 'petrol',
    HYBRID = 'hybrid',
    ELECTRIC = 'electric',
}

export default class Vehicle extends Typegoose {
    @IsString()
    @prop({ required: true })
    type: string;

    @IsString()
    @prop({ required: true })
    licenseDetails: string;

    @IsEnum(EngineType)
    @prop({ enum: Object.values(EngineType), required: true })
    engineType: EngineType;

    @IsMongoId()
    @prop({ ref: Customer, required: true })
    customer: Ref<Customer>;
}
