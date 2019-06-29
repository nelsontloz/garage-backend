import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { BookingSchema } from './schemas/booking.schema';
import { VehicleSchema } from './schemas/vehicle.schema';
import { CustomerController } from './customer/customer.controller';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { CustomerService } from './customer/customer.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
  ],
  controllers: [AppController, BookingController, CustomerController],
  providers: [AppService, BookingService, CustomerService],
})
export class AppModule { }
