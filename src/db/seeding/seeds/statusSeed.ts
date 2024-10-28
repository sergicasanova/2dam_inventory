import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Status } from '../../../status/status.entity';
import { Issue } from '../../../issues/issues.entity';
import statusData from '../../../data/inventory_status';

export class StatusSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const statusRepository = dataSource.getRepository(Status);
    const issueRepository = dataSource.getRepository(Issue);

    const issues = await issueRepository.find();

    const statuses = statusData.map((item) => {
      const status = new Status();
      status.id_status = item.id_status;
      status.description = item.description;
      status.issues = issues.find(issue => issue.id_issue === item.id_status );
      return status;
    });

    await statusRepository.save(statuses);

    console.log('Status seeding completed!');
  }
}
