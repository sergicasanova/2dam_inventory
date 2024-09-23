import { Body, Controller , Delete, Get , Param, Post, Put, Query } from '@nestjs/common';
import { StatusService } from './status.service';
import { query } from 'express';
@Controller('Status')
export class StatusController {
    private  StatusService: StatusService;
    constructor(StatusService:StatusService){
        this.StatusService = StatusService;
    };
    @Get()
    getAllStatus(@Query() query){
        console.log(query)
        return this.StatusService.getAllStatus();
    }
    @Get(':id')
    getStatus(@Param('id') id: string) {
        return this.StatusService.getStatus(parseInt(id));
    }
    @Post()
    createStatus(@Body()Status){
        return this.StatusService.createStatus(Status);
    }   
    @Put(':id')
    UpdateStatus(@Param('id') id:string, @Body()Status){
        return this.StatusService.updateStatus({
        ...Status,
        id: parseInt(id)
        });
    }
    @Delete(':id')
    deleteStatus (@Param('id') id:string){
        return this.StatusService.deleteStatus(parseInt(id));
    }
}
