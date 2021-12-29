/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:21 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-12-29 17:28:31
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "root",
      password: "papaki",
      database: "taskmanagement_db",
      entities: [__dirname + "/../**/*.entity.{js,ts}"], 
      synchronize: true,
    }),
  ]
})
export class AppModule {}
