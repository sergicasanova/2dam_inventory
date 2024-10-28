import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
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
    const classrooms = await this.classroomRepository.find();

    if (xml === 'true') {
      const jsonformatted = JSON.stringify({ Classrooms: classrooms });
      return this.utilsService.convertJSONtoXML(jsonformatted);
    }

    return classrooms;
  }

  async createClassroom(classroomData: Classroom): Promise<{ message: string }> {
    const classroom = this.classroomRepository.create(classroomData);
    await this.classroomRepository.save(classroom);
    return { message: 'Aula creada' };
  }

  async getClassroom(id: number, xml?: string): Promise<Classroom | string> {
    const classroom = await this.classroomRepository.findOneBy({ id_classroom: id });

    if (!classroom) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }

    if (xml === 'true') {
      const jsonformatted = JSON.stringify(classroom);
      return this.utilsService.convertJSONtoXML(jsonformatted);
    }

    return classroom;
  }

  async updateClassroom(id: number, updateData: Partial<Classroom>): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOneBy({
      id_classroom: id,
    });

    if (!classroom) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }

    // Cambia esto para asegurar que `merge` retorna un nuevo objeto
    const updatedClassroom = this.classroomRepository.merge(classroom, updateData);
    return this.classroomRepository.save(updatedClassroom);
}


  async deleteClassroom(id: number): Promise<{ message: string }> {
    const result = await this.classroomRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Aula eliminada' };
  }
}
