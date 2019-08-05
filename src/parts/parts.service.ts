import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Parts from '../models/parts.model';
import { ModelType } from 'typegoose';
import { ObjectId } from 'bson';

@Injectable()
export class PartsService {
  constructor(
    @InjectModel(Parts) private readonly partsModel: ModelType<Parts>,
  ) {}

  async create(createPartDto: Parts): Promise<Parts> {
    const createPart = new this.partsModel(createPartDto);
    return await createPart.save();
  }

  async getAllParts() {
    return await this.partsModel.find();
  }

  async deletePartById(id: string) {
    return await this.partsModel.deleteOne({
      _id: new ObjectId(id),
    });
  }
}
