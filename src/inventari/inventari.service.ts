import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventari } from './inventari.entity';
import { UtilsService } from '../utils/utils.service';
import { CreateInventariDto, UpdateInventariDto } from './inventari.dto';

@Injectable()
export class InventariService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(Inventari)
    private readonly inventariRepository: Repository<Inventari>,
  ) {}

  async getInventari(id?: number, xml?: string): Promise<any> {
    const result = await this.inventariRepository.findOneBy({
      id_inventory: id,
    });

    if (xml === 'true') {
      const jsonFormatted = JSON.stringify({
        Inventari: this.inventariRepository.find(),
      });
      const xmlResult = this.utilsService.convertJSONtoXML(jsonFormatted);
      return xmlResult;
    }

    return result;
  }

  async getInventariAll(xml?: string): Promise<any> {
    const result = await this.inventariRepository.find({
      relations: ['fk_inventary_type', 'fk_issue', 'fk_classroom'],
    });
    if (xml === 'true') {
      const jsonFormatted = JSON.stringify({
        Inventari: result,
      });
      const xmlResult = this.utilsService.convertJSONtoXML(jsonFormatted);
      return xmlResult;
    }

    return result;
  }

  async createInventari(createInventariDto: CreateInventariDto): Promise<{ message: string }> {
    const newInventari = this.inventariRepository.create({
      ...createInventariDto,
      fk_inventary_type: { id_type: createInventariDto.id_type },  
      fk_classroom: { id_classroom: createInventariDto.id_classroom }, 
    });
    await this.inventariRepository.save(newInventari);
    return { message: 'Inventario creado' };
  }
  

  async updateInventari(id: number, inventari: UpdateInventariDto) {
    const updatedData = {
      ...inventari,
      fk_inventary_type: { id_type: inventari.id_type },  
      fk_classroom: { id_classroom: inventari.id_classroom }, 
    };

    await this.inventariRepository.update(id, updatedData);
    const updatedInventari = await this.inventariRepository.findOneBy({
      id_inventory: id,
    });
    if (!updatedInventari) {
      throw new HttpException('Inventario no encontrado', HttpStatus.NOT_FOUND);
    }
    return updatedInventari;
  }
  

  async deleteInventari(id: number): Promise<{ message: string }> {
    const result = await this.inventariRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Inventario no encontrado', HttpStatus.NOT_FOUND);
    }
    return { message: 'Inventario eliminado' };
  }
}
