import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const fs = require('node:fs');
var path = require('path');
const filePath = path.join(path.resolve(__dirname, '..'), 'data/inventory_type.json');
const inventoryTypeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(inventoryTypeData));
}
@Injectable()
export class InventariTypeService {
  getAllInventariType() {
    return inventoryTypeData;
  }

  createInventariType(inventari_type: any) {
    inventoryTypeData.push(
          {
            id_type: inventoryTypeData[inventoryTypeData.length - 1].id_type + 1,
              ...inventari_type
          });
      saveData();
      return { message: 'Estado creado satisfactoriamente' };
  }

  getInventariType(id: number) {
      var i = 0;
      while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != id ) {
          i++;
      }
      if (inventoryTypeData[i])
          return inventoryTypeData[i];
      else
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  updateInventariType(inventariTypeUpdated) {
      var i = 0;
      while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != inventariTypeUpdated.id_type ) {
          i++;
      }
      if (inventoryTypeData[i]){
        inventoryTypeData[i]=inventariTypeUpdated;
            saveData();
            return inventoryTypeData[i];
      }else
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  deleteInventariType(id: number) {
      var i = 0;
      while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != id ) {
          i++;
      }
      if (inventoryTypeData[i]){
        saveData();
          return inventoryTypeData.splice(i,1);
      }else
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
