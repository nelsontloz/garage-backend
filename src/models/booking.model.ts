import { Typegoose, prop, Ref } from 'typegoose';
import { IsEnum, IsString } from 'class-validator';
import Customer from './customer.model';
import Vehicle from './vehicle.model';

export enum BookingServiceType {
    ANUAL_SERVICE = 'Anual Service',
    MAJOR_SERVICE = 'Major Service',
    REPAIR = 'Repair',
    MAJOR_REPAIR = 'Major Repair',
}

export enum BookingStatus {
    BOOKED = 'booked',
    IN_SERVICE = 'in_service',
    FIXED = 'fixed',
    COLLECTED = 'collected',
    UNREPAIRABLE = 'unrepairable',
}

export default class Booking extends Typegoose {
    @IsEnum(BookingServiceType)
    @prop({ enum: BookingServiceType })
    serviceType: BookingServiceType;

    @IsEnum(BookingStatus)
    @prop({ enum: Object.values(BookingStatus) })
    status: BookingStatus;

    @IsString()
    @prop()
    date: string;

    @IsString()
    @prop()
    customerComments: string;

    @prop({ ref: Customer, required: true })
    customer: Ref<Customer>;

    @prop({ ref: Vehicle, required: true })
    vehicle: Ref<Vehicle>;
}
