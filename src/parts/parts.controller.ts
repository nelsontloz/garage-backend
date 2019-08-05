import { Controller, Post, Body, Get, Delete, Query } from '@nestjs/common';
import Parts from '../models/parts.model';
import { PartsService } from './parts.service';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get()
  async getParts(): Promise<Parts[]> {
    return await this.partsService.getAllParts();
  }

  @Delete()
  async DeletePart(@Query('partId') partId: string): Promise<any> {
    return await this.partsService.deletePartById(partId);
  }

  @Post()
  async createPart(@Body() createPart: Parts): Promise<Parts> {
    return await this.partsService.create(createPart);
  }
}
