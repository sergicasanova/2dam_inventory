import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { default as UsersData } from '../data/inventory_users';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class UsersService {
  constructor(private readonly utilsService: UtilsService) {}
  getAllUser(xml?: string) {
    if (xml === 'true') {
      const jsonformatted = JSON.stringify({ Users: UsersData });
      return this.utilsService.convertJSONtoXML(jsonformatted);
    } else {
      return UsersData;
    }
  }

  createUser(Users: any) {
    const lastId = UsersData.length
      ? UsersData[UsersData.length - 1].id_user
      : 0;
    UsersData.push({
      id_user: lastId + 1,
      ...Users,
    });
    return { message: 'Usuario creado satisfactoriamente' };
  }

  getUser(id: number, xml?: string) {
    let i = 0;
    while (i < UsersData.length && UsersData[i].id_user != id) {
      i++;
    }
    if (i < UsersData.length) {
      if (xml === 'true') {
        const jsonformatted = JSON.stringify({ User: UsersData[i] });
        return this.utilsService.convertJSONtoXML(jsonformatted);
      }

      return UsersData[i];
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  updateUser(UsersUpdated: any) {
    let i = 0;
    while (
      i < UsersData.length &&
      UsersData[i].id_user != UsersUpdated.id_user
    ) {
      i++;
    }
    if (i < UsersData.length) {
      UsersData[i] = UsersUpdated;

      return { message: `Usuario actualizado satisfactoriamente` };
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
  deleteUser(id: number) {
    let i = 0;
    while (i < UsersData.length && UsersData[i].id_user != id) {
      i++;
    }
    if (i < UsersData.length) {
      const deletedUser = UsersData.splice(i, 1);
      return deletedUser;
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
