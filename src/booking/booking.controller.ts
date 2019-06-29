import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from '../dtos/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  async create(@Body() createBooking: CreateBookingDto) {
    return this.bookingService.create(createBooking);
  }

  @Get()
  async findAll() {
    return this.bookingService.findAllByCustomerId('5d17c2339a12687d1f2621bd');
  }
}
