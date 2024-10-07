import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StatusModule } from './status/status.module';
import { ClassroomModule } from './classroom/classroom.module';
import { InventariModule } from './inventari/inventari.module';
import { InventariTypeModule } from './inventari_type/inventari_type.module';
import { IssuesModule } from './issues/issues.module';
import { UtilsModule } from './utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventari } from './inventari/inventari.entity';

@Module({
  imports: [
    ClassroomModule,
    InventariTypeModule,
    IssuesModule,
    UsersModule,
    StatusModule,
    InventariModule,
    UtilsModule,
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [Inventari],
        synchronize: true,
      }),
    UsersModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
