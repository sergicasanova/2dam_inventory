import { setSeederFactory } from "typeorm-extension";
import { Status } from '../../../status/status.entity';
import { faker } from '@faker-js/faker';

export const StatusFactory = setSeederFactory(Status, () => {
  const status = new Status();
  status.description = faker.lorem.paragraph();
  return status;
});
