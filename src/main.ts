/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:38:07 
 * @Last Modified by:   Ardrit Krasniqi © 
 * @Last Modified time: 2022-01-03 15:38:07 
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { doc } from 'prettier';
import environmentLogLevels from './logging/get-log-levels-environment';
import { CustomLogger } from './logging/custom-logger';

async function bootstrap() {

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLogger))

  const config = new DocumentBuilder()
    .setTitle('Tasks Example')
    .setDescription('The tasks API description')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3030);

  logger.log(`Application listening on: ${await app.getUrl()}`)
}
bootstrap();
