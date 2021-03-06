import { Typegoose, prop, Ref } from 'typegoose';
import { IsMongoId, IsOptional, IsDate, IsBoolean } from 'class-validator';
import Account from './account.model';

export default class Session extends Typegoose {

    @IsMongoId()
    @IsOptional()
    _id: string;

    @IsMongoId()
    @IsOptional()
    @prop({
        index: true,
    })
    accessToken: string;

    @IsDate()
    @IsOptional()
    @prop({ required: true })
    timeStamp: Date;

    @IsDate()
    @IsOptional()
    @prop({ required: true })
    expiration: Date;

    @IsMongoId()
    @IsOptional()
    @prop({ ref: Account })
    account: Ref<Account>;

    @IsBoolean()
    @IsOptional()
    @prop({ default: false })
    revoked: boolean;
}
