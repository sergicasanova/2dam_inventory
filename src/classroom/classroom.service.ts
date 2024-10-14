import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { Classroom } from './classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
  ) {}

  async getAllClassroom(xml?: string): Promise<Classroom[] | string> {
    if (xml === 'true') {
      const jsonformatted = JSON.stringify({
        Classrooms: await this.classroomRepository.find(),
      });
      const xmlResult = this.utilsService.convertJSONtoXML(jsonformatted);
      return xmlResult;
    } else {
      return this.classroomRepository.find();
    }
  }

  async createClassroom(Classroom: any): Promise<Classroom[]> {
    const newClassroom = this.classroomRepository.create(Classroom);
    return this.classroomRepository.save(newClassroom);
  }

  async getClassroom(
    id: number,
    xml?: string,
  ): Promise<Classroom | string | null> {
    const classroom = await this.classroomRepository.findOneBy({
      id_classroom: id,
    });

    if (classroom) {
      if (xml === 'true') {
        const jsonformatted = JSON.stringify(classroom);
        return await this.utilsService.convertJSONtoXML(jsonformatted);
      } else {
        return classroom;
      }
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateClassroom(updatedClassroomData: any): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne(
      updatedClassroomData.id,
    );

    if (!classroom) {
      throw new Error('Classroom not found');
    }

    this.classroomRepository.merge(classroom, updatedClassroomData);
    return this.classroomRepository.save(classroom);
  }

  async deleteClassroom(id: number): Promise<void> {
    await this.classroomRepository.delete(id);
  }
}
