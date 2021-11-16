/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:21 
 * @Last Modified by:   Ardrit Krasniqi 
 * @Last Modified time: 2021-10-16 23:44:21 
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule
  ]
})
export class AppModule {}
