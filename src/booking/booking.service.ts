import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Booking, { BookingStatus } from '../models/booking.model';
import { ModelType } from 'typegoose';
import * as moment from 'moment';
import * as calendar from 'calendar-js';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private readonly bookingModel: ModelType<Booking>,
  ) {}

  async create(createBookingDto: Booking): Promise<Booking> {
    const createBooking = new this.bookingModel(createBookingDto);
    return await createBooking.save();
  }

  async findBookingById(id: string): Promise<Booking> {
    return await this.bookingModel
      .findOne({
        _id: id,
      })
      .populate('customer', '-password')
      .exec();
  }

  async findBookingByDate(date: moment.Moment): Promise<Booking> {
    return await this.bookingModel
      .findOne({
        date: date.toDate(),
      })
      .populate('customer', '-password')
      .exec();
  }

  async findBookingByCustomer(id: string): Promise<Booking[]> {
    return await this.bookingModel
      .find({
        customer: id,
      })
      .exec();
  }

  async bookSlotByDate(slotId: string, bookingDetails: any): Promise<Booking> {
    return await this.bookingModel
      .findOneAndUpdate(
        {
          _id: slotId,
        },
        bookingDetails,
      )
      .exec();
  }

  async updateBookStatus(slotId: string, status: BookingStatus) {
    console.log(status);
    return await this.bookingModel
      .findOneAndUpdate(
        {
          _id: slotId,
        },
        {
          status,
        },
      )
      .exec();
  }

  async findSlotsByDay(date: moment.Moment): Promise<Booking[]> {
    return await this.bookingModel
      .find({
        date: {
          $gt: date.toISOString(),
          $lt: date
            .clone()
            .add(1, 'day')
            .toISOString(),
        },
      })
      .exec();
  }

  async getSlotsAvailable(
    startDate: moment.Moment,
    endDate: moment.Moment,
  ): Promise<any> {
    return await this.bookingModel.aggregate([
      {
        $match: {
          date: {
            $gt: startDate.toDate(),
            $lt: endDate.toDate(),
          },
          status: BookingStatus.FREE,
        },
      },
      {
        $group: {
          _id: { $dayOfYear: '$date' },
          date: { $first: '$date' },
          slots: { $sum: 1 },
        },
      },
    ]);
  }

  async getBookedSlots(
    startDate: moment.Moment,
    endDate: moment.Moment,
  ): Promise<any> {
    return await this.bookingModel.aggregate([
      {
        $match: {
          date: {
            $gt: startDate.toDate(),
            $lt: endDate.toDate(),
          },
          status: {
            $ne: BookingStatus.FREE,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfYear: '$date' },
          date: { $first: '$date' },
          slots: { $sum: 1 },
        },
      },
    ]);
  }

  async getBookedSlotsDetails(
    startDate: moment.Moment,
    endDate: moment.Moment,
  ): Promise<any> {
    return await this.bookingModel
      .find({
        date: {
          $gt: startDate.toDate(),
          $lt: endDate.toDate(),
        },
        status: {
          $ne: BookingStatus.FREE,
        },
      })
      .populate('customer', '-password');
  }

  async createSlots() {
    const months = [];
    const validDays: moment.Moment[] = [];
    const slots = [];
    const initialDate = moment();

    for (let i = 0; i < 10; i++) {
      const month = (calendar as any)().detailed(
        initialDate.year(),
        initialDate.month(),
      );
      months.push(month);
      initialDate.add(1, 'month');
    }

    months.forEach(month => {
      month.calendar.forEach(week => {
        week.forEach((day, index: number) => {
          // console.log(day);
          if (index === 0 || index === 6) {
            return;
          }
          if (!day.isInPrimaryMonth) {
            return;
          }
          const momDay = moment(day.date);
          validDays.push(momDay);
        });
      });
    });

    validDays.forEach(day => {
      let firstSlot = day.clone().add(9, 'hours');
      for (let i = 0; i < 8; i++) {
        slots.push(firstSlot);
        firstSlot = firstSlot.clone().add(1, 'hour');
      }
    });

    slots.forEach((slot: moment.Moment) => {
      this.bookingModel.create({
        status: BookingStatus.FREE,
        date: slot.toDate(),
      });
    });
  }
}
