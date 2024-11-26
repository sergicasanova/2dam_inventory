import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthService } from 'src/Autentication/auth.service';
import { DataSource } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
@Controller('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  getAllUser(@Query('xml') xml?: string) {
    try {
      return this.usersService.getAllUser(xml);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }
  @Get(':id')
  getUser(@Param('id') id: string, @Query('xml') xml?: string) {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.getUser(userId, xml);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.updateUser({
      ...updateUserDto,
      id_user: userId,
    });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.deleteUser(userId);
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!email || !password) {
      throw new HttpException(
        'El nombre de usuario y la contraseña son obligatorios',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.generateToken(user.id_user);
    return { token };
  }
  @Get('technician-stats/:id')
  async getTechnicianStats(@Param('id') id: string) {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    const technician = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id_user: userId, role: 2 } });

    if (!technician) {
      throw new HttpException('El usuario no es un técnico', HttpStatus.NOT_FOUND);
    }

    try {
    const stats = await this.dataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .innerJoin('issue', 'issue', 'user.id_user = issue.id_tecnic')
    .where('user.id_user = :userId', { userId: userId })
    .andWhere('user.role = :role', { role: 2 })
    .select('user.id_user AS id_user')
    .addSelect('user.name AS name')
    .addSelect('user.surname AS surname')
    .addSelect('COUNT(issue.id_issue) AS total_issues')
    .addSelect('SUM(issue.id_status = 4) AS Completadas')
    .addSelect('SUM(issue.id_status = 3) AS Canceladas')
    .addSelect('SUM(issue.id_status = 2) AS Abiertas')
    .addSelect('SUM(issue.id_status = 1) AS Creaddas')
    .addSelect(`
      SEC_TO_TIME(
          IFNULL(
              AVG(
                  IF(issue.id_status = 4, TIMESTAMPDIFF(SECOND, issue.created_at, issue.last_updated), NULL)
              ),
              0
          )
      ) AS Media_tiempo_resolucion
  `)  
    .groupBy('user.id_user')
    .getRawOne();

      if (!stats) {
        throw new HttpException('No se encontraron estadísticas para este técnico', HttpStatus.NOT_FOUND);
      }

      return stats;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.message || 'Error interno en el servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }
}