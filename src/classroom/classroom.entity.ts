import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id_classroom: number;

  @Column()
  description: string;
}
