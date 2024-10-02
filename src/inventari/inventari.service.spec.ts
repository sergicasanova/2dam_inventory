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

async function postInventari() {
  const headersList: HeadersInit = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  };

  const response: Response = await fetch('http://localhost:3000/inventari/', {
    method: 'POST',
    headers: headersList,
  });

  const data: string = await response.text();
  console.log(data);
}
postInventari();
