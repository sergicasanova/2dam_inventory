import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassroomModule } from './classroom/classroom.module';
import { InventariTypeModule } from './inventari_type/inventari_type.module';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [ClassroomModule, InventariTypeModule, IssuesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
