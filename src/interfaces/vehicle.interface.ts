import { Document, Schema } from 'mongoose';

export default interface Vehicle extends Document {
    type: string;
    licenseDetails: string;
    engineType: EngineType;
    customerId: Schema.Types.ObjectId;
}

export enum EngineType {
    'diesel', 'petrol', 'hybrid', 'electric',
}
