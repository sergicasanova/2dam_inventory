import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './user.dto';
@Injectable()
export class UsersService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getAllUser(xml?: string): Promise<User[] | string> {
    const users = await this.usersRepository.find();
    if (xml === 'true') {
      const jsonformatted = JSON.stringify({
        users,
      });
      return this.utilsService.convertJSONtoXML(jsonformatted);
    } else {
      return users;
    }
  }

  async createUser(user: UserDto): Promise<User> {
    const usuario = this.usersRepository.create(user);
    const passwordHash = await bcrypt.hash(usuario.password, 10);
    usuario.password = passwordHash;
    return this.usersRepository.save(usuario);
  }

  async getUser(id_user: number, xml?: string): Promise<User | string | null> {
    const user = await this.usersRepository.findOneBy({ id_user });

    if (user != null) {
      if (xml == 'true') {
        const jsonformatted = JSON.stringify(user);
        return this.utilsService.convertJSONtoXML(jsonformatted);
      } else {
        return user;
      }
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(UsersUpdated: any): Promise<User> {
    const user = await this.usersRepository.findOne(UsersUpdated.id_user);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    this.usersRepository.merge(user, UsersUpdated);
    return this.usersRepository.save(user);
  }

  async deleteUser(id_user: number): Promise<void> {
    await this.usersRepository.delete(id_user);
  }
  async validateUser(id_user: number, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id_user } });
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
  }
}

