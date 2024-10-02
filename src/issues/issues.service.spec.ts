import { Test, TestingModule } from '@nestjs/testing';
import { IssuesService } from './issues.service';

describe('IssuesService', () => {
  let service: IssuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssuesService],
    }).compile();

    service = module.get<IssuesService>(IssuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

async function fetchIssues() {
  const headersList: { [key: string]: string } = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
  };

  try {
    const response = await fetch("http://localhost:3000/issues/", {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: string = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error fetching issues:', error);
  }
}
fetchIssues();
