import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Customer from '../interfaces/customer.interface';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Injectable()
export class CustomerService {

    constructor(@InjectModel('Customer') private readonly customerModule: Model<Customer>) { }

    async create(createCatDto: CreateCustomerDto): Promise<Customer> {
        const createdCat = new this.customerModule(createCatDto);
        return await createdCat.save();
    }

    async findAllByCustomerId(id: string): Promise<Customer[]> {
        return await this.customerModule.find({
            _id: id,
        }).exec();
    }
}
