import { Typegoose, prop } from 'typegoose';
import { IsString, IsEnum } from 'class-validator';

export enum VehicleEngineType {
  DIESEL = 'diesel',
  PETROL = 'petrol',
  HYBRID = 'hybrid',
  ELECTRIC = 'electric',
}

export default class Vehicle extends Typegoose {
  @IsString()
  @prop({ required: true })
  type: string;

  @IsString()
  @prop({ required: true, index: true })
  licenseDetails: string;

  @IsEnum(VehicleEngineType)
  @prop({ enum: Object.values(VehicleEngineType), required: true })
  engineType: VehicleEngineType;

  @IsString()
  @prop({ required: true })
  maker: string;
}
