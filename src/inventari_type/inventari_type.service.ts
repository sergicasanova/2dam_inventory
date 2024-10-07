import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { default as inventoryTypeData } from '../data/inventory_type';
import { UtilsService } from 'src/utils/utils.service';
@Injectable()
export class InventariTypeService {
  constructor(private readonly UtilsService: UtilsService) {}
  getAllInventariType(xml: string) {
    if (xml === 'true') {
      const jsonForXml = JSON.stringify({ inventory_type: inventoryTypeData });
      return this.UtilsService.convertJSONtoXML(jsonForXml);
    }
    return inventoryTypeData;
  }

  createInventariType(inventari_type: any) {
    inventoryTypeData.push({
      id_type: inventoryTypeData[inventoryTypeData.length - 1].id_type + 1,
      ...inventari_type,
    });
    return { message: 'Estado creado satisfactoriamente' };
  }

  getInventariType(id: number, xml: string) {
    let i = 0;
    while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != id) {
      i++;
    }
    if (i >= inventoryTypeData.length) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (xml === 'true') {
      const jsonForXml = JSON.stringify({ status: inventoryTypeData[i] });
      return this.UtilsService.convertJSONtoXML(jsonForXml);
    } else {
      return inventoryTypeData[i];
    }
  }

  updateInventariType(inventariTypeUpdated) {
    let i = 0;
    while (
      i < inventoryTypeData.length &&
      inventoryTypeData[i].id_type != inventariTypeUpdated.id_type
    ) {
      i++;
    }
    if (inventoryTypeData[i]) {
      inventoryTypeData[i] = inventariTypeUpdated;
      return inventoryTypeData[i];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  deleteInventariType(id: number) {
    let i = 0;
    while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != id) {
      i++;
    }
    if (inventoryTypeData[i]) {
      return inventoryTypeData.splice(i, 1);
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
