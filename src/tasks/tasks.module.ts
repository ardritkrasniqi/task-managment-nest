/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:26 
 * @Last Modified by:   Ardrit Krasniqi 
 * @Last Modified time: 2021-10-16 23:44:26 
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      TaskRepository
    ])
  ],

  controllers: [
    TasksController
  ],
  providers: [
    TasksService
  ],
})
export class TasksModule {}
