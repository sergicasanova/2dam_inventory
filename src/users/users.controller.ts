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
import { UsersService } from './users.service';
import { AuthService } from 'src/Autentication/auth.service';
@Controller('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
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
  createUser(@Body() Users: any) {
    return this.usersService.createUser(Users);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() Users: any) {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.updateUser({
      ...Users,
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
  async login(@Body('id_user') id_user: number, @Body('password') password: string) {
    if (!id_user || !password) {
        throw new HttpException(
            'El nombre de usuario y la contraseña son obligatorios',
            HttpStatus.BAD_REQUEST,
        );
    }

    const user = await this.usersService.validateUser(id_user, password);
    if (!user) {
        throw new HttpException(
            'Credenciales inválidas',
            HttpStatus.UNAUTHORIZED,
        );
    }

    const token = await this.authService.generateToken(user.id_user);
    return { token };
}
}
