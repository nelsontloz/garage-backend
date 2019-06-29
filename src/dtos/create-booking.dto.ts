import { IsString, IsDate, IsMongoId, IsNotEmpty, IsDefined, IsDateString, IsEnum } from 'class-validator';
import { BookingServiceType, BookingStatus } from '../interfaces/booking.interface';

export class CreateBookingDto {
  @IsDefined()
  @IsEnum(BookingServiceType)
  readonly serviceType: string;

  @IsDefined()
  @IsEnum(BookingStatus)
  readonly status: string;

  @IsDefined()
  @IsDateString()
  readonly date: Date;

  @IsMongoId()
  @IsDefined()
  readonly customerId: string;
}
