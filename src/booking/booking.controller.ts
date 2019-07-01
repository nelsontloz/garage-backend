import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import Booking from '../models/booking.model';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  async create(@Body() createBooking: Booking) {
    return this.bookingService.create(createBooking);
  }

  @Get(':id')
  async findAll(@Param('id') id: string) {
    return this.bookingService.findCustomerById(id);
  }
}
