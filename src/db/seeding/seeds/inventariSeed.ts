import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Inventari } from '../../../inventari/inventari.entity';
import inventoryData from '../../../data/inventory';

export class InventariSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const inventariRepository = dataSource.getRepository(Inventari);

    await inventariRepository.save(inventoryData);

    console.log('Inventari seeding completed!');
  }
}
