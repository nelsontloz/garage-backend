import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Booking from '../models/booking.model';
import { ModelType } from 'typegoose';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking) private readonly bookingModel: ModelType<Booking>) { }

  async create(createBookingDto: Booking): Promise<Booking> {
    const createBooking = new this.bookingModel(createBookingDto);
    return await createBooking.save();
  }

  async findCustomerById(id: string): Promise<Booking> {
    return await this.bookingModel.findOne({
      _id: id,
    })
    .populate('customer')
    .exec();
  }
}
