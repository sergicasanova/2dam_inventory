import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from './users.entity';

export class UserSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const specificUser = new User();
    specificUser.name = 'root';
    specificUser.surname = 'root';
    specificUser.email = 'usuario@root.com';
    specificUser.role = 0;
    await dataSource.getRepository(User).save(specificUser);
  }
}
