import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
});
