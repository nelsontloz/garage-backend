import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { CustomerController } from './customer/customer.controller';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { CustomerService } from './customer/customer.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import Customer from './models/customer.model';
import Booking from './models/booking.model';
import Vehicle from './models/vehicle.model';
import User from './models/user.model';
import Session from './models/session.model';
import { HttpStrategy } from './http.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    TypegooseModule.forRoot('mongodb://localhost/nest'),
    TypegooseModule.forFeature([Customer]),
    TypegooseModule.forFeature([Booking]),
    TypegooseModule.forFeature([Vehicle]),
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Session]),
  ],
  controllers: [
    AppController,
    BookingController,
    CustomerController,
    UsersController,
    AuthController,
  ],
  providers: [
    AppService,
    BookingService,
    CustomerService,
    AuthService,
    UsersService,
    HttpStrategy,
  ],
})
export class AppModule { }
