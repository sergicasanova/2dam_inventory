import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from './users/users.entity';
import { UserSeed } from './users/users.seeder';
import { IssueConversationEntity } from './issues_conversation/issues_conversation.entity';
import { Issue } from './issues/issues.entity';
import { Classroom } from './classroom/classroom.entity';
import { Inventari_type } from './inventari_type/inventari_type.entity';
import { Inventari } from './inventari/inventari.entity';
import { Status } from './status/status.entity';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'database',
  port: configService.get('MYSQL_SERVER_PORT'),
  username: configService.get('MYSQL_USER'),
  password: configService.get('MYSQL_PASSWORD'),
  database: configService.get('MYSQL_DATABASE'),
  entities: [
    Classroom,
    Issue,
    Inventari_type,
    IssueConversationEntity,
    User,
    Inventari,
    Status,
  ],
  seeds: [UserSeed],
  synchronize: true,
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
