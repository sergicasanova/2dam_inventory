import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';

describe('StatusService', () => {
  let service: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService],
    }).compile();

    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

const headersList: HeadersInit = {
  "Accept": "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)"
};

const fetchStatus = async (): Promise<void> => {
  try {
    const response: Response = await fetch("http://localhost:3000/status/", {
      method: "GET",
      headers: headersList
    });

    const data: string = await response.text();
    console.log(data);
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

fetchStatus();
