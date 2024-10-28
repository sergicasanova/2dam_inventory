import { Inventari } from '../inventari/inventari.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id_classroom: number;

  @Column({ nullable: true })
  description: string | null;

  @OneToMany(() => Inventari, (fk_inventari) => fk_inventari.fk_classroom)
  fk_inventari: Inventari[];
}
