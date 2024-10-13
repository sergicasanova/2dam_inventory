import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventari } from './inventari.entity';
import * as convert from 'xml-js';

@Injectable()
export class InventariService {
  constructor(
    @InjectRepository(Inventari)
    private readonly inventariRepository: Repository<Inventari>,
  ) {}

  async getInventari(id?: number, xml?: string): Promise<any> {
    const result = await this.inventariRepository.findOneBy({
        id_inventory: id, 
    });

    if (xml === 'true') {
        const jsonFormatted = { inventory: result };
        const json = JSON.stringify(jsonFormatted);
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        return convert.json2xml(json, options);
    }
    return result;
}

  async getInventariAll(xml?: string): Promise<any> {
   
    const result = await this.inventariRepository.find();
      
      if (xml === 'true') {
        const jsonFormatted = { inventory_list: result };
        const json = JSON.stringify(jsonFormatted);
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        return convert.json2xml(json, options);
      }
  
      return result;
    }
  
  async createInventari(
    inventari: Partial<Inventari>,
  ): Promise<{ message: string }> {
    const newInventari = this.inventariRepository.create(inventari);
    await this.inventariRepository.save(newInventari);
    return { message: 'Inventario creado' };
  }

  async updateInventari(id: number, inventari: Inventari): Promise<Inventari> {
    await this.inventariRepository.update(id, inventari);
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
