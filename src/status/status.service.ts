import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
    getAllStatus() {
        return { message: 'Todos los estados han sido recuperados satisfactoriamente' };
    }

    createStatus(Status: any) {
        return { message: 'Estado creado satisfactoriamente' };
    }

    getStatus(id: number) {
        return { message: `Estado con id ${id} recuperado satisfactoriamente` };
    }

    updateStatus(StatusUpdated) {
        return { message: `Estado con id ${StatusUpdated.id} actualizado satisfactoriamente` };
    }

    deleteStatus(id: number) {
        return { message: `Estado con id ${id} eliminado satisfactoriamente` };
    }
}
