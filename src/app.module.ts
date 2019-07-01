import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { CustomerController } from './customer/customer.controller';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { CustomerService } from './customer/customer.service';
import Customer from './models/customer.model';
import Booking from './models/booking.model';
import Vehicle from './models/vehicle.model';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/nest'),
    TypegooseModule.forFeature([Customer]),
    TypegooseModule.forFeature([Booking]),
    TypegooseModule.forFeature([Vehicle]),
  ],
  controllers: [
    AppController,
    BookingController,
    CustomerController,
  ],
  providers: [
    AppService,
    BookingService,
    CustomerService,
  ],
})
export class AppModule { }
