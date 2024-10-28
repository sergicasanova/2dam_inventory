import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Status } from '../../../status/status.entity';
import statusData from '../../../data/inventory_status';

export class StatusSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const statusRepository = dataSource.getRepository(Status);

    const statuses = statusData.map((item) => {
      const status = new Status();
      status.id_status = item.id_status;
      status.description = item.description;
      return status;
    });

    await statusRepository.save(statuses);

    console.log('Status seeding completed!');
  }
}
