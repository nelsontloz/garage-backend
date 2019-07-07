import { Typegoose, prop, Ref } from 'typegoose';
import { IsString, IsEnum, IsMongoId } from 'class-validator';
import Account from './account.model';

export enum VehicleEngineType {
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

    @IsEnum(VehicleEngineType)
    @prop({ enum: Object.values(VehicleEngineType), required: true })
    engineType: VehicleEngineType;

    @IsMongoId()
    @prop({ ref: Account, required: true })
    account: Ref<Account>;
}
