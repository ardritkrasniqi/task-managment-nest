/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:21 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-11-23 23:12:17
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ]
})
export class AppModule {}
