import { Module } from '@nestjs/common';
import { usersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  controllers: [usersController],
  providers: [UserService]
})
export class UsersModule {}
