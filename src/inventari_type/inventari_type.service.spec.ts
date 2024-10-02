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

interface InventariType {
  id_type: number;
  description: string;
}

async function fetchInventariTypes(): Promise<void> {
  const headersList: HeadersInit = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
  };

  try {
    const response: Response = await fetch("http://localhost:3000/inventari_type/", {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: InventariType[] = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching inventari types:", error);
  }
}
fetchInventariTypes();
