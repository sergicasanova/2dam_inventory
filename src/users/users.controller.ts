import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { query } from 'express';
import { error } from 'console';
@Controller('Status')
export class UsersController {
    private UsersService: UsersService;
    constructor(UsersService: UsersService) {
        this.UsersService = UsersService;
    };
    @Get()
    getAllUser(@Query() query) {
        try {
            return this.UsersService.getAllUser();
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: err,
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err
            });
        }
    }
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.UsersService.getUser(parseInt(id));
    }
    @Post()
    createUser(@Body() Status) {
        return this.UsersService.createUser(Status);
    }
    @Put(':id')
    UpdateUser(@Param('id') id: string, @Body() Status) {
        return this.UsersService.updateUser({
            ...Status,
            id_status: parseInt(id)
        });
    }
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.UsersService.deleteUser(parseInt(id));
    }
}
