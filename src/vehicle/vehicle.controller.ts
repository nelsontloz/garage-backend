import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import Vehicle from '../models/vehicle.model';
import { VehicleService } from './vehicle.service';
import { AuthService } from '../auth/auth.service';
import { ObjectID } from 'bson';
import Account from '../models/account.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createVehicle: Vehicle, @Headers() headers) {
    const accessToken = headers.authorization.split(' ')[1];
    const session = await this.authService.getSession(accessToken);
    createVehicle.account = new ObjectID((session.account as Account)._id);
    return this.vehicleService.create(createVehicle);
  }
}
