import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Put,
  Headers,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import Booking, { BookingStatus } from '../models/booking.model';
import { AuthGuard } from '@nestjs/passport';
import moment = require('moment');
import { AuthService } from '../auth/auth.service';
import { ObjectID } from 'bson';
import Account from '../models/account.model';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createBooking: Booking) {
    return this.bookingService.create(createBooking);
  }

  @Get()
  // @UseGuards(AuthGuard())
  async findSlotsByDay(@Query('date') date: string) {
    const dateMoment = moment(date, 'DD-MM-YYYY');
    return await this.bookingService.findSlotsByDay(dateMoment);
  }

  @Get('my-slots')
  @UseGuards(AuthGuard())
  async findSlotsByCustomer(@Headers() headers) {
    const accessToken = headers.authorization.split(' ')[1];
    const session = await this.authService.getSession(accessToken);
    return await this.bookingService.findBookingByCustomer(
      (session.account as Account)._id,
    );
  }

  @Get('slot')
  async getSlotByDate(@Query('date') isoDate: string) {
    const dateMoment = moment(isoDate);
    return await this.bookingService.findBookingByDate(dateMoment);
  }

  @Put('book-slot')
  @UseGuards(AuthGuard())
  async bookSlotById(
    @Headers() headers,
    @Query('slotId') slotId: string,
    @Body() bookingDetails: any,
  ) {
    const accessToken = headers.authorization.split(' ')[1];
    const session = await this.authService.getSession(accessToken);
    bookingDetails.status = BookingStatus.BOOKED;
    bookingDetails.customer = new ObjectID((session.account as Account)._id);
    return await this.bookingService.bookSlotByDate(slotId, bookingDetails);
  }

  @Get('slots')
  async getSlotsAvailable(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const startMoment = moment(startDate, 'DD-MM-YYYY');
    const endMoment = moment(endDate, 'DD-MM-YYYY');
    return await this.bookingService.getSlotsAvailable(startMoment, endMoment);
  }

  @Post('slots')
  async createSlots() {
    return this.bookingService.createSlots();
  }
}
