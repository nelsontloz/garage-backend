import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Booking from '../interfaces/booking.interface';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { validate } from 'class-validator';

@Injectable()
export class BookingService {
  constructor(@InjectModel('Booking') private readonly bookingModel: Model<Booking>) { }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createBooking = new this.bookingModel(createBookingDto);
    return await createBooking.save();
  }

  async findAllByCustomerId(id: string): Promise<Booking[]> {
    return await this.bookingModel.find({
      _id: id,
    })
    .populate('customerId')
    .exec();
  }
}
