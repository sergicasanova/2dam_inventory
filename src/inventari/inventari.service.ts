import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { default as inventariData } from '../data/inventory';
import { UtilsService } from 'src/utils/utils.service';
@Injectable()
export class InventariService {
  constructor(private readonly UtilsService: UtilsService) {}
  getAllInventaris(xml: string) {
    if (xml === 'true') {
      const jsonForXml = JSON.stringify({ inventory_list: inventariData });
      return this.UtilsService.convertJSONtoXML(jsonForXml);
    }
    return inventariData;
  }

  createInventari(task: any) {
    inventariData.push({
      id_inventory: inventariData[inventariData.length - 1].id_inventory + 1,
      ...task,
    });

    return { message: 'Inventario creado satisfactoriamente' };
  }

  getInventari(id: number, xml: string) {
    let i = 0;
    while (i < inventariData.length && inventariData[i].id_inventory != id) {
      i++;
    }
    if (inventariData[i]) {
      if (xml === 'true') {
        const jsonForXml = JSON.stringify({ inventory_list: inventariData });
        return this.UtilsService.convertJSONtoXML(jsonForXml);
      }
      return inventariData;
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  updateInventari(taskUpdated: any) {
    let i = 0;
    while (
      i < inventariData.length &&
      inventariData[i].id_inventory != taskUpdated.id_inventory
    ) {
      i++;
    }
    if (inventariData[i]) {
      inventariData[i] = taskUpdated;
      return inventariData[i];
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  deleteInventari(id: number) {
    let i = 0;
    while (i < inventariData.length && inventariData[i].id_inventory != id) {
      i++;
    }
    if (inventariData[i]) {
      return inventariData.splice(i, 1);
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
