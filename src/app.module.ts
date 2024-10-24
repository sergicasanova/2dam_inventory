import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StatusModule } from './status/status.module';
import { ClassroomModule } from './classroom/classroom.module';
import { InventariModule } from './inventari/inventari.module';
import { InventariTypeModule } from './inventari_type/inventari_type.module';
import { IssuesModule } from './issues/issues.module';
import { UtilsModule } from './utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { IssuesConversationModule } from './issues_conversation/issues_conversation.module';
import { Inventari_type } from './inventari_type/inventari_type.entity';
import { User } from './users/users.entity';
import { Issue } from './issues/issues.entity';
import { Classroom } from './classroom/classroom.entity';
import { Inventari } from './inventari/inventari.entity';
import { IssueConversationEntity } from './issues_conversation/issues_conversation.entity';
import { Status } from './status/status.entity';
import { SeederOptions } from 'typeorm-extension';
import { UserSeed } from './users/users.seeder';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClassroomModule,
    InventariTypeModule,
    IssuesModule,
    UsersModule,
    StatusModule,
    InventariModule,
    UtilsModule,
    IssuesConversationModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService & SeederOptions) => ({
        type: 'mysql',
        host: 'database',
        port: +configService.get('PORT'),
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
        synchronize: true,
        seeds: [UserSeed],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
