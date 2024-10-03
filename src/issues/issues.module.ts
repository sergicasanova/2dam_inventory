import { Module } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { UtilsModule } from 'src/utils/utils.module';


@Module({
  imports: [UtilsModule],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
