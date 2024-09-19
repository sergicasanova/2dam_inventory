import { Test, TestingModule } from '@nestjs/testing';
import { InventariTypeService } from './inventari_type.service';

describe('InventariTypeService', () => {
  let service: InventariTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventariTypeService],
    }).compile();

    service = module.get<InventariTypeService>(InventariTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
