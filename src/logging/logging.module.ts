import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLogger } from './custom-logger';
import { Log } from './log.entity';
import { LogsService } from './logs.service';

@Module({
imports: [TypeOrmModule.forFeature([Log])],
exports: [CustomLogger],
providers: [CustomLogger, LogsService]
})
export class LoggingModule {

}
