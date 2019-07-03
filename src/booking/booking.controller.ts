import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import Booking from '../models/booking.model';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  async create(@Body() createBooking: Booking) {
    return this.bookingService.create(createBooking);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findAll(@Param('id') id: string, @Req() request: Request) {
    console.log(request);
    return this.bookingService.findCustomerById(id);
  }
}
