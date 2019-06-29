import { Document } from 'mongoose';

export default interface Customer extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}
