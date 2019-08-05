import { Typegoose, prop } from 'typegoose';
import { IsString, IsNumber, IsMongoId, IsOptional } from 'class-validator';

export default class Parts extends Typegoose {
  @IsMongoId()
  @IsOptional()
  // tslint:disable-next-line: variable-name
  _id: string;

  @IsString()
  @prop({ required: true })
  name: string;

  @IsNumber()
  @prop({ required: true })
  price: number;
}
