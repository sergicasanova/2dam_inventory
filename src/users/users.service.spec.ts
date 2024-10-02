import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


interface User {
  id_user: number;
  name: string;
  username: string;
  email: string;
  role: number;
}

interface UserRequest {
  users: User[];
}

const headersList: HeadersInit = {
  "Accept": "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Content-Type": "application/json"
};

const bodyContent: UserRequest = {
  users: [
    {
      id_user: 1,
      name: "Federico",
      username: "Gonzalez",
      email: "federico@gmail.com",
      role: 0
    },
    {
      id_user: 2,
      name: "Gonzalo",
      username: "Martinez",
      email: "gonzalo@gmail.com",
      role: 1
    },
    {
      id_user: 3,
      name: "Gustavo",
      username: "Messi",
      email: "gustavo@gmail.com",
      role: 1
    }
  ]
};

const makeRequest = async () => {
  try {
    const response = await fetch("http://localhost:3000/users/", {
      method: "POST",
      body: JSON.stringify(bodyContent),
      headers: headersList
    });

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

makeRequest();