/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:38:31 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 15:04:55
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService,UserRepository],
  exports: [UsersService, UserRepository],
  controllers: [UsersController]
})
export class UsersModule {}
