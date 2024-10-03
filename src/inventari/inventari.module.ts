import { Module } from '@nestjs/common';
import { InventariController } from './inventari.controller';
import { InventariService } from './inventari.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [InventariController],
  providers: [InventariService],
})
export class InventariModule {}
