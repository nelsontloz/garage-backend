import { Controller, Post, Body, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) { }

    @Post()
    async create(@Body() createBooking: CreateCustomerDto) {
        return this.customerService.create(createBooking);
    }

    @Get()
    async findAll() {
        return this.customerService.findAllByCustomerId('5d19c8385bf47870d060d286');
    }
}
