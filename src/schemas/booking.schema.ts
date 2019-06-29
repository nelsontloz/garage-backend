import * as mongoose from 'mongoose';

export const BookingSchema = new mongoose.Schema({
    serviceType: {
        type: String,
        enum: ['Anual Service', 'Major Service', 'Repair', 'Major Repair'],
        required: true,
    },
    status: {
        type: String,
        enum: ['booked', 'in_service', 'fixed', 'collected', 'unrepairable'],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer',
        required: true,
    },
});
