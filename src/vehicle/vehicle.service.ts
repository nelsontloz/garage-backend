import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Vehicle from '../models/vehicle.model';
import { ModelType } from 'typegoose';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle) private readonly vehicleModel: ModelType<Vehicle>,
  ) {}

  async create(vehicle: Vehicle): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(vehicle);
    return await createdVehicle.save();
  }
}
