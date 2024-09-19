import { Body, Controller , Delete, Get , Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { query } from 'express';
@Controller('tasks')
export class usersController {
    private  UsersService: UserService;
    constructor(UsersService:UserService){
        this.UsersService = UsersService;
    };
    @Get()
    getAllUser(@Query() query){
        console.log(query)
        return this.UsersService.getAllUser();
    }
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.UsersService.getUser(parseInt(id));
    }
    @Post()
    createUser(@Body()User){
        return this.UsersService.createUser(User);
    }   
    @Put(':id')
    UpdateUser(@Param('id') id:string, @Body()User){
        return this.UsersService.updateUser({
        ...User,
        id: parseInt(id)
        });
    }
    @Delete(':id')
    deleteTask (@Param('id') id:string){
        return this.UsersService.deleteUser(parseInt(id));
    }
}
