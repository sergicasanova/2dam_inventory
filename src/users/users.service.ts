import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const fs = require('node:fs');
 var path = require('path');
 const filepath = path.join(path.resolve(__dirname, '..'),'/data/inventory_users.json');
 const UsersData = JSON.parse(fs.readFileSync(filepath, 'utf8'));  
function SaveData() {
    fs.writeFileSync(filepath, JSON.stringify(UsersData));
};

@Injectable()
export class UsersService {
    getAllUser() {
            return UsersData ;
}

createUser(Users: any) {
    const lastId = UsersData.length ? UsersData[UsersData.length - 1].id_user : 0;
    UsersData.push({
        id_user: lastId + 1,
        ...Users,
    });
    SaveData();
    return { message: 'Usuario creado satisfactoriamente' };
}

getUser(id: number) {
    var i = 0;
    while (i < UsersData.length && UsersData[i].id_user != id) {
        i++;
    }
    if (i < UsersData.length) {
        return UsersData[i];
    } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
}

updateUser(UsersUpdated: any) {
    var i = 0;
    while (i < UsersData.length && UsersData[i].id_user != UsersUpdated.id_user) {
        i++;
    }
    if (i < UsersData.length) {
        UsersData[i] = UsersUpdated;
        SaveData();
        return { message: `Usuario actualizado satisfactoriamente` };
    } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
}
deleteUser(id: number) {
    var i = 0;
    while (i < UsersData.length && UsersData[i].id_user != id) {
        i++;
    }
    if (i < UsersData.length) {
        const deletedUser = UsersData.splice(i, 1);
        SaveData();
        return deletedUser;
    } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
}
}