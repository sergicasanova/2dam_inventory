import * as typeorm from 'typeorm';

@typeorm.Entity()
export class Inventari_type {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column()
  descripcion: string;
}
