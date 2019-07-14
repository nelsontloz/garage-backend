import { Typegoose, prop, Ref } from 'typegoose';
import { IsEnum, IsString, IsDate, IsOptional } from 'class-validator';
import Vehicle from './vehicle.model';
import Account from './account.model';

export enum BookingServiceType {
    ANNUAL_SERVICE = 'Annual Service',
    MAJOR_SERVICE = 'Major Service',
    REPAIR = 'Repair',
    MAJOR_REPAIR = 'Major Repair',
}

export enum BookingStatus {
    FREE = 'free',
    BOOKED = 'booked',
    IN_SERVICE = 'in service',
    FIXED = 'fixed',
    COLLECTED = 'collected',
    UNREPAIRABLE = 'unrepairable',
}

export default class Booking extends Typegoose {
    @IsEnum(BookingServiceType)
    @IsOptional()
    @prop({ enum: Object.values(BookingServiceType) })
    serviceType: BookingServiceType;

    @IsEnum(BookingStatus)
    @prop({ enum: Object.values(BookingStatus), required: true })
    status: BookingStatus;

    @IsDate()
    @prop({ required: true })
    date: Date;

    @IsString()
    @IsOptional()
    @prop()
    customerComments: string;

    @IsOptional()
    @prop({ ref: Account })
    customer: Ref<Account>;

    @IsOptional()
    @prop({ ref: Vehicle })
    vehicle: Ref<Vehicle>;
}
