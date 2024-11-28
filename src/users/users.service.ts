import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UpdateUserDto } from './user.dto';
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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const usuario = await this.usersRepository.create(createUserDto);
    const passwordHash = await bcrypt.hash(await usuario.password, 10);
    usuario.password = passwordHash;
    return this.usersRepository.save(usuario);
  }

  async getStatisticsUser(id_user: number): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id_user });
    if (user != null) {
      const statistics = await this.usersRepository
        .createQueryBuilder('user')
        .select('COUNT(issue.id_issue)', 'totalIssues')
        .addSelect(
          "COUNT(CASE WHEN status.description = 'Creada' THEN 1 END)",
          'numIssuesCreadas',
        )
        .addSelect(
          "COUNT(CASE WHEN status.description = 'En revisión' THEN 1 END)",
          'numIssuesRevision',
        )
        .addSelect(
          "COUNT(CASE WHEN status.description = 'Rechazada' THEN 1 END)",
          'numIssuesRechazadas',
        )
        .addSelect(
          "COUNT(CASE WHEN status.description = 'Completada' THEN 1 END)",
          'numIssuesCompl',
        )
        .addSelect(
          "SEC_TO_TIME(AVG(CASE WHEN status.description = 'Completada' THEN TIMESTAMPDIFF(SECOND, issue.created_at, issue.last_updated) END))",
          'difHorasCompletarIssues',
        )
        .innerJoin('issue', 'issue', 'user.id_user = issue.id_user')
        .innerJoin('status', 'status', 'status.id_status = issue.id_status')
        .where('user.id_user = :id', { id: id_user })
        .getRawOne();
      const statisticsAbiertas = await this.usersRepository
        .createQueryBuilder('user')
        .select('issue.id_issue', 'idIssuesAbierta')
        .innerJoin('issue', 'issue', 'user.id_user = issue.id_user')
        .innerJoin('status', 'status', 'status.id_status = issue.id_status')
        .where(
          "user.id_user = :id AND (status.description = 'Creada' OR status.description = 'En revisión')",
          { id: id_user },
        )
        .getRawMany();
      const result = {
        totalIssues: parseInt(statistics.totalIssues),
        numIssuesCreadas: parseInt(statistics.numIssuesCreadas),
        numIssuesRevision: parseInt(statistics.numIssuesRevision),
        numIssuesRechazadas: parseInt(statistics.numIssuesRechazadas),
        numIssuesCompl: parseInt(statistics.numIssuesCompl),
        idIssuesAbiertas: statisticsAbiertas.map(
          (issue) => issue.idIssuesAbierta,
        ),
        difHorasCompletarIssues: statistics.difHorasCompletarIssues,
      };
      return result;
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
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

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id_user: updateUserDto.id_user },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async deleteUser(id_user: number): Promise<void> {
    await this.usersRepository.delete(id_user);
  }
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
