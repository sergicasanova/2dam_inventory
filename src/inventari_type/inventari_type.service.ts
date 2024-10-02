// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import * as fs from 'node:fs';
// import * as path from 'path';

// const filePath = path.join(
//   path.resolve(__dirname, '..'),
//   'data/inventory_type.json',
// );
// const inventoryTypeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// function saveData() {
//   fs.writeFileSync(filePath, JSON.stringify(inventoryTypeData));
// }
// @Injectable()
// export class InventariTypeService {
//   getAllInventariType() {
//     return inventoryTypeData;
//   }

//   createInventariType(inventari_type: any) {
//     inventoryTypeData.push({
//       id_type: inventoryTypeData[inventoryTypeData.length - 1].id_type + 1,
//       ...inventari_type,
//     });
//     saveData();
//     return { message: 'Estado creado satisfactoriamente' };
//   }

//   getInventariType(id: number) {
//     let i = 0;
//     while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != id) {
//       i++;
//     }
//     if (inventoryTypeData[i]) return inventoryTypeData[i];
//     else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
//   }

//   updateInventariType(inventariTypeUpdated) {
//     let i = 0;
//     while (
//       i < inventoryTypeData.length &&
//       inventoryTypeData[i].id_type != inventariTypeUpdated.id_type
//     ) {
//       i++;
//     }
//     if (inventoryTypeData[i]) {
//       inventoryTypeData[i] = inventariTypeUpdated;
//       saveData();
//       return inventoryTypeData[i];
//     } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
//   }

//   deleteInventariType(id: number) {
//     let i = 0;
//     while (i < inventoryTypeData.length && inventoryTypeData[i].id_type != id) {
//       i++;
//     }
//     if (inventoryTypeData[i]) {
//       saveData();
//       return inventoryTypeData.splice(i, 1);
//     } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
//   }
// }

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'path';

// Cargar datos desde el JSON
const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/inventory_type.json',
);
const inventoryTypeData = JSON.parse(fs.readFileSync(filePath, 'utf8')).inventory_type;

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify({ inventory_type: inventoryTypeData }));
}

@Injectable()
export class InventariTypeService {
  getAllInventariType() {
    return inventoryTypeData;
  }

  createInventariType(inventari_type: any) {
    const newId = inventoryTypeData.length > 0 
      ? inventoryTypeData[inventoryTypeData.length - 1].id_type + 1 
      : 1;  // Asigna 1 si no hay tipos en el inventario

    inventoryTypeData.push({
      id_type: newId,
      ...inventari_type,
    });
    
    saveData();
    return { message: 'Tipo creado satisfactoriamente' };
  }

  getInventariType(id: number) {
    const inventariType = inventoryTypeData.find(item => item.id_type === id);
    if (inventariType) return inventariType;
    else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  updateInventariType(inventariTypeUpdated) {
    const index = inventoryTypeData.findIndex(item => item.id_type === inventariTypeUpdated.id_type);
    if (index !== -1) {
      inventoryTypeData[index] = inventariTypeUpdated;
      saveData();
      return inventoryTypeData[index];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  deleteInventariType(id: number) {
    const index = inventoryTypeData.findIndex(item => item.id_type === id);
    if (index !== -1) {
      const deletedItem = inventoryTypeData.splice(index, 1);
      saveData();
      return deletedItem;
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
