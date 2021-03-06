import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Put,
  Headers,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import Booking, { BookingStatus } from '../models/booking.model';
import { AuthGuard } from '@nestjs/passport';
import moment = require('moment');
import { AuthService } from '../auth/auth.service';
import { ObjectID } from 'bson';
import Account from '../models/account.model';
import Parts from '../models/parts.model';

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

  @Get('/one-slot')
  // @UseGuards(AuthGuard())
  async findSlotById(@Query('slotId') slotId: string) {
    return await this.bookingService.findBookingById(slotId);
  }

  @Put('/one-slot-status')
  // @UseGuards(AuthGuard())
  async updateSlotStatus(
    @Query('slotId') slotId: string,
    @Query('status') status: string,
  ) {
    if (Object.values(BookingStatus).indexOf(status) < 0) {
      throw new BadRequestException('invalid status');
    }
    return await this.bookingService.updateBookStatus(
      slotId,
      status as BookingStatus,
    );
  }

  @Put('/one-slot-part')
  // @UseGuards(AuthGuard())
  async addOnePart(@Body() part: Parts, @Query('slotId') slotId: string) {
    return await this.bookingService.addExtraPart(slotId, part);
  }

  @Delete('/one-slot-part')
  // @UseGuards(AuthGuard())
  async removeOnePart(
    @Query('slotId') slotId: string,
    @Query('partId') partId: string,
  ) {
    return await this.bookingService.removeExtraPart(slotId, partId);
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

  @Get('booked-slots')
  async getBookedSlots(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const startMoment = moment(startDate, 'DD-MM-YYYY');
    const endMoment = moment(endDate, 'DD-MM-YYYY');
    return await this.bookingService.getBookedSlots(startMoment, endMoment);
  }

  @Get('booked-slots-details')
  async getBookedSlotsDetails(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const startMoment = moment(startDate, 'DD-MM-YYYY');
    const endMoment = moment(endDate, 'DD-MM-YYYY');
    return await this.bookingService.getBookedSlotsDetails(
      startMoment,
      endMoment,
    );
  }

  @Post('slots')
  async createSlots() {
    return this.bookingService.createSlots();
  }
}
