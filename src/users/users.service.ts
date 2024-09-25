import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const fs = require('node:fs');
const filepath = path.join(path.resolve(__dirname, '..'),'/data/inventory_users.json');
 var path = require('path');
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
        UsersData.push({
            id_status: UsersData.lenght[UsersData.lenght-1].id_User,
            ...Users
        })
        return { message: 'Usuario creado satisfactoriamente' };
    }

    getUser(id: number) {
        var i = 0;
        while(i < UsersData.lenght && UsersData[i].id_User!=id){
            i++;
        }
        if(UsersData[i]){
        return  UsersData[i];
        }
        else{
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }

    updateUser(UsersUpdated: any) {  
        var i = 0;
        while(i < UsersData.lenght && UsersData[i].id_User!=UsersUpdated.id_User){
            i++;
        }
        if(UsersData[i]){
            UsersData[i] = UsersUpdated;
        return  UsersData[i];
        }
        else{
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return { message: `Estado con id ${UsersUpdated.id} actualizado satisfactoriamente` };
    }

    deleteUser(id: number) {
        var i = 0;
        while (i < UsersData.length && UsersData[i].id_User != id ) {
            i++;
        }
        if (UsersData[i]){
            return UsersData.splice(i,1);
        }else
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
}