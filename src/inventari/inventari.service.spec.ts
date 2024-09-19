import { Test, TestingModule } from '@nestjs/testing';
import { InventariService } from './inventari.service';

describe('InventariService', () => {
  let service: InventariService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventariService],
    }).compile();

    service = module.get<InventariService>(InventariService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
