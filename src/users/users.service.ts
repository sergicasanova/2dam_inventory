import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAllUser() {
    return {
      message: 'Todos los usuarios han sido recuperados satisfactoriamente',
    };
  }

  createUser(user: any) {
    return { message: `Usuario creado satisfactoriamente ${user}` };
  }

  getUser(id: number) {
    return { message: `Usuario con id ${id} recuperado satisfactoriamente` };
  }

  updateUser(userUpdated: any) {
    return {
      message: `Usuario con id ${userUpdated.id} actualizado satisfactoriamente`,
    };
  }

  deleteUser(id: number) {
    return { message: `Usuario con id ${id} eliminado satisfactoriamente` };
  }
}
