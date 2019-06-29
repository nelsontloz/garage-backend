import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
    type: String,
    licenseDetails: String,
    engineType: {
        type: String,
        enum: ['diesel', 'petrol', 'hybrid', 'electric'],
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
});
