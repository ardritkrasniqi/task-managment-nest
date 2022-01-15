/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:38:07 
 * @Last Modified by:   Ardrit Krasniqi © 
 * @Last Modified time: 2022-01-03 15:38:07 
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {


  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
  
  logger.log(`Application listening on: ${await app.getUrl()}`)
}
bootstrap();
