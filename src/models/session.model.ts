import { Typegoose, prop, Ref } from 'typegoose';
import { IsMongoId, IsOptional } from 'class-validator';
import User from './user.model';

export default class Session extends Typegoose {

    @IsMongoId()
    @IsOptional()
    @prop({
        index: true,
    })
    accessToken: string;

    @IsMongoId()
    @IsOptional()
    @prop({ ref: User })
    user: Ref<User>;
}
