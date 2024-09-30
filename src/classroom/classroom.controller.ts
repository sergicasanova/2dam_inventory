import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';

@Controller('Classroom')
export class ClassroomController {
  private ClassroomService: ClassroomService;

  constructor(ClassroomService: ClassroomService) {
    this.ClassroomService = ClassroomService;
  }

  @Get()
  getAllClassrooms() {
    try {
      return this.ClassroomService.getAllClassrooms();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }

  @Get(':id')
  getClassroom(@Param('id') id: string) {
    return this.ClassroomService.getClassroom(parseInt(id));
  }

  @Post()
  createClassroom(@Body() Classroom) {
    return this.ClassroomService.createClassroom(Classroom);
  }

  @Put(':id')
  updateClassroom(@Param('id') id: string, @Body() Classroom) {
    return this.ClassroomService.updateClassroom({
      ...Classroom,
      id_classroom: parseInt(id),
    });
  }

  @Delete(':id')
  deleteClassroom(@Param('id') id: string) {
    return this.ClassroomService.deleteClassroom(parseInt(id));
  }
}
