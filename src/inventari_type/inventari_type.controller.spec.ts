import { Test, TestingModule } from '@nestjs/testing';
import { InventariTypeController } from './inventari_type.controller';

describe('InventariTypeController', () => {
  let controller: InventariTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventariTypeController],
    }).compile();

    controller = module.get<InventariTypeController>(InventariTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
