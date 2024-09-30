import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'path';

const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/inventory.json',
);
const inventariData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(inventariData));
}

@Injectable()
export class InventariService {
  getAllInventaris() {
    return inventariData;
  }

  createInventari(task: any) {
    inventariData.push({
      id_inventory: inventariData[inventariData.length - 1].id_inventory + 1,
      ...task,
    });
    saveData();
    return { message: 'Inventario creado satisfactoriamente' };
  }

  getInventari(id: number) {
    let i = 0;
    while (i < inventariData.length && inventariData[i].id_inventory != id) {
      i++;
    }
    if (inventariData[i]) {
      saveData();
      return inventariData[i];
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
      saveData();
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
      saveData();
      return inventariData.splice(i, 1);
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
