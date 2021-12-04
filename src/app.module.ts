/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:21 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-12-03 15:28:18
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    })
  ]
})
export class AppModule {}
