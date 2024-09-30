import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { InventariTypeService } from './inventari_type.service';
import { query } from 'express';
import { error } from 'console';

@Controller('inventari_type')
export class InventariTypeController {
    private inventariTypeService: InventariTypeService;
    constructor(inventariTypeService: InventariTypeService) {
        this.inventariTypeService = inventariTypeService;
    }
    @Get()
    getAllInventariType(@Query() query) {
        try {
            return this.inventariTypeService.getAllInventariType();
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: err,
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err,
            });
        }
    }
    @Get(':id')
    getInventariType(@Param('id') id: string) {
      return this.inventariTypeService.getInventariType(parseInt(id));
    }
    @Post()
    createInventariType(@Body() inventari_type) {
      return this.inventariTypeService.createInventariType(inventari_type);
    }
    @Put(':id')
    updateInventariType(@Param('id') id: string, @Body() inventari_type) {
      return this.inventariTypeService.updateInventariType({
        ...inventari_type,
        id_type: parseInt(id)
    });
    }
    @Delete(':id')
    deleteInventariType(@Param('id') id: string) {
      return this.inventariTypeService.deleteInventariType(parseInt(id));
    }
}
