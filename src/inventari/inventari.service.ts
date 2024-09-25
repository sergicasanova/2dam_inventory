import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const fs = require('node:fs');
var path = require('path');
const filePath = path.join(path.resolve(__dirname, '..'), 'data/inventory.json');
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
            ...task
        });
        saveData();
        return { message: 'Inventario creado satisfactoriamente' };
    }

    getInventari(id: number) {
        var i = 0;
        while (i < inventariData.length && inventariData[i].id_inventory != id) {
            i++;
        }
        if (inventariData[i]) {
            return inventariData[i];
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }

    updateInventari(taskUpdated: any) {
        var i = 0;
        while (i < inventariData.length && inventariData[i].id_inventory != taskUpdated.id_inventory) {
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
        var i = 0;
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