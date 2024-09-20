import { Injectable, NotFoundException  } from '@nestjs/common';

@Injectable()
export class InventariService {
    private invet=[];
    public id=0;
    getAllInventaris(){
        return(`todos los objetos objeto`);
    }
    createInventari(task:any){
        return(`objeto con id ${this.id} creado`);
    }
    getInventari(id:number){
        return(`objeto con id ${id} recuperado`);
    }
    updateInventari(taskUpdated){
        return(`objeto con id ${this.id} recuperado`);
    }
    deleteInventari(id:number){
        return(`objeto con id ${id} borrado`);
    }
}
