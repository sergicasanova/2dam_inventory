import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [IssuesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
