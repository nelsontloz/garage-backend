import { Controller, Get, Post, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import Booking from '../models/booking.model';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import moment = require('moment');

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  async create(@Body() createBooking: Booking) {
    return this.bookingService.create(createBooking);
  }

  @Get()
  // @UseGuards(AuthGuard())
  async findSlotsByDay(@Query('date') date: string) {
    const dateMoment = moment(date, 'dd-mm-yyyy');
    return await this.bookingService.findSlotsByDay(dateMoment);
  }

  @Post('slots')
  async createSlots() {
    return this.bookingService.createSlots();
  }
}
