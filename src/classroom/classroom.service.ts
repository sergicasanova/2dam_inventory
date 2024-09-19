import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassroomService {
  private classrooms = [];

  findAll() {
    return this.classrooms;
  }

  findOne(id: string) {
    return this.classrooms.find((item) => item.id === id);
  }

  create(createClassroomDto: any) {
    this.classrooms.push(createClassroomDto);
    return createClassroomDto;
  }

  update(id: string, updateClassroomDto: any) {
    const index = this.classrooms.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.classrooms[index] = updateClassroomDto;
    }
    return updateClassroomDto;
  }

  remove(id: string) {
    this.classrooms = this.classrooms.filter((item) => item.id !== id);
  }
}
