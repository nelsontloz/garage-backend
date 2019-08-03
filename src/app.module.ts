import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { HttpStrategy } from './auth/http.strategy';
import { PassportModule } from '@nestjs/passport';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { ConfigModule, configFactory } from './config/config.module';
import Booking from './models/booking.model';
import Vehicle from './models/vehicle.model';
import Session from './models/session.model';
import Account from './models/account.model';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    TypegooseModule.forRootAsync({
      useFactory: () => {
        const config = configFactory();
        return {
          uri: config.get('DATABASE_URI'),
        };
      },
    }),
    TypegooseModule.forFeature([Booking]),
    TypegooseModule.forFeature([Vehicle]),
    TypegooseModule.forFeature([Session]),
    TypegooseModule.forFeature([Account]),
  ],
  controllers: [
    AppController,
    BookingController,
    AuthController,
    AccountController,
  ],
  providers: [
    AppService,
    BookingService,
    AuthService,
    HttpStrategy,
    AccountService,
  ],
})
export class AppModule {}
