import { Document, Schema } from 'mongoose';

export default interface Booking extends Document {
    serviceType: BookingServiceType;
    status: BookingStatus;
    date: string;
    customerId: Schema.Types.ObjectId;
    customerComments: string;
}

export enum BookingServiceType {
    'Anual Service', 'Major Service', 'Repair', 'Major Repair',
}

export enum BookingStatus {
    'booked', 'in_service', 'fixed', 'collected', 'unrepairable',
}
