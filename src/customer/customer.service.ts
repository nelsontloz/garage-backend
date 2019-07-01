import { Injectable } from '@nestjs/common';
import Customer from '../models/customer.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer) private readonly customerModel: ModelType<Customer>) { }

    async create(createCatDto: CreateCustomerDto): Promise<Customer> {
        const createdCat = new this.customerModel(createCatDto);
        return await createdCat.save();
    }

    async findAllByCustomerId(id: string): Promise<Customer[]> {
        return await this.customerModel.find({
            _id: id,
        }).exec();
    }
}
