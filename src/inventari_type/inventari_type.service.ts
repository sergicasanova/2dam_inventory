import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { default as inventoryTypeData } from '../data/inventory_type';

@Injectable()
export class InventariTypeService {
  getAllInventariType() {
    return inventoryTypeData;
  }

  createInventariType(inventari_type: any) {
    inventoryTypeData.push({
      id_type: inventoryTypeData[inventoryTypeData.length - 1].id_type + 1,
      ...inventari_type,
    });
    return { message: 'Estado creado satisfactoriamente' };
  }

  getInventariType(id: number) {
    let i = 0;
    while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != id) {
      i++;
    }
    if (inventoryTypeData[i]) return inventoryTypeData[i];
    else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
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
