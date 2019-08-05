import { Test, TestingModule } from '@nestjs/testing';
import { PartsController } from './parts.controller';

describe('Parts Controller', () => {
  let controller: PartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartsController],
    }).compile();

    controller = module.get<PartsController>(PartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
