/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:26 
 * @Last Modified by:   Ardrit Krasniqi 
 * @Last Modified time: 2021-10-16 23:44:26 
 */
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
