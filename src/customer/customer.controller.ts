import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import Customer from '../models/customer.model';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) { }

    @Post()
    async create(@Body() createBooking: Customer) {
        return this.customerService.create(createBooking);
    }

    @Get()
    async findAll() {
        return this.customerService.findCustomerById('5d19c8385bf47870d060d286');
    }

    @Get(':email')
    async findCustomerByEmail(@Param('email') email: string) {
        return this.customerService.findCustomerByEmail(email);
    }
}
