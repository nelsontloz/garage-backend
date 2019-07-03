import { Injectable } from '@nestjs/common';
import Customer from '../models/customer.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer) private readonly customerModel: ModelType<Customer>) { }

    async create(customer: Customer): Promise<Customer> {
        const createdCat = new this.customerModel(customer);
        return await createdCat.save();
    }

    async findCustomerByEmail(email: string): Promise<Customer> {
        return await this.customerModel.findOne({
            email,
        }).exec();
    }

    async findCustomerById(id: string): Promise<Customer> {
        return await this.customerModel.findOne({
            _id: id,
        }).exec();
    }
}
