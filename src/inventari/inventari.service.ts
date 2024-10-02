import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'path';

const filePath = path.join(path.resolve(__dirname, '..'), 'data/inventory.json');
let inventariData: any;

try {
  const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Asegúrate de que `fileContent` tenga la propiedad `inventory`
  inventariData = fileContent.inventory || [];
} catch (error) {
  console.error('Error leyendo o parseando el archivo JSON:', error);
  inventariData = [];
}

// Si inventariData no es un array, inicializarlo como un array vacío
if (!Array.isArray(inventariData)) {
  inventariData = [];
}

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify({ inventory: inventariData }, null, 2)); 
}

@Injectable()
export class InventariService {
  getAllInventaris() {
    return inventariData;
  }

  createInventari(task: any) {
    // Genera un nuevo id basado en el último id o empieza en 1 si está vacío
    const newId = inventariData.length > 0 ? inventariData[inventariData.length - 1].id_inventory + 1 : 1;

    inventariData.push({
      id_inventory: newId,
      ...task,
    });
    saveData();
    return { message: 'Inventario creado satisfactoriamente' };
  }

  getInventari(id: number) {
    const inventari = inventariData.find((item) => item.id_inventory === id);
    if (inventari) {
      return inventari;
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  updateInventari(taskUpdated: any) {
    const index = inventariData.findIndex((item) => item.id_inventory === taskUpdated.id_inventory);
    if (index !== -1) {
      inventariData[index] = taskUpdated;
      saveData();
      return inventariData[index];
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  deleteInventari(id: number) {
    const index = inventariData.findIndex((item) => item.id_inventory === id);
    if (index !== -1) {
      const deleted = inventariData.splice(index, 1);
      saveData();
      return deleted;
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
