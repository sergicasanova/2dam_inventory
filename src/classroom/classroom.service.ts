import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { default as classroomData } from '../data/classroom';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ClassroomService {
  constructor(private readonly UtilsService: UtilsService) {}
  getAllClassroom(xml: string) {
    if (xml === 'true') {
      const jsonForXml = JSON.stringify({ classrom_list: classroomData });
      return this.UtilsService.convertJSONtoXML(jsonForXml);
    }
    return classroomData;
  }

  createClassroom(Classroom: any) {
    classroomData.push({
      id_classroom: classroomData[classroomData.length - 1].id_classroom + 1,
      ...Classroom,
    });

    return { message: 'Aula creada satisfactoriamente' };
  }

  getClassroom(id: number, xml: string) {
    let i = 0;
    while (i < classroomData.length && classroomData[i].id_classroom != id) {
      i++;
    }
    if (xml === 'true') {
      const jsonForXml = JSON.stringify({ classrom_list: classroomData });
      return this.UtilsService.convertJSONtoXML(jsonForXml);
    }
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
