import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { default as classroomData } from '../data/classroom';

@Injectable()
export class ClassroomService {
  getAllClassrooms() {
    return classroomData;
  }

  createClassroom(Classroom: any) {
    classroomData.push({
      id_classroom: classroomData[classroomData.length - 1].id_classroom + 1,
      ...Classroom,
    });

    return { message: 'Aula creada satisfactoriamente' };
  }

  getClassroom(id: number) {
    let i = 0;
    while (i < classroomData.length && classroomData[i].id_classroom != id) {
      i++;
    }
    if (classroomData[i]) return classroomData[i];
    else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  updateClassroom(ClassroomUpdated) {
    let i = 0;
    while (
      i < classroomData.length &&
      classroomData[i].id_classroom != ClassroomUpdated.id_classroom
    ) {
      i++;
    }
    if (classroomData[i]) {
      classroomData[i] = ClassroomUpdated;
      return classroomData[i];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  deleteClassroom(id: number) {
    let i = 0;
    while (i < classroomData.length && classroomData[i].id_classroom != id) {
      i++;
    }
    if (classroomData[i]) {
      const deletedClassroom = classroomData.splice(i, 1);
      return deletedClassroom;
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
