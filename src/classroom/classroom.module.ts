import { Module } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [ClassroomController],
  providers: [ClassroomService],
})
export class ClassroomModule {}
