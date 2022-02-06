import { Logger as TypeOrmLogger, QueryRunner } from "typeorm";
import { Logger as NestLogger } from "@nestjs/common";

export class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('SQL')
  private allowLogLevel = false;


  constructor(allowLogLevel: boolean) {
    this.allowLogLevel = allowLogLevel;
  };

  logQuery(query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    // since "LOG" level is too verbose, i decided to stop this one to show logs on console
    // this is done on initialisation from database Module
    if (this.allowLogLevel) {
      if (queryRunner?.data?.isCreatingLogs) {
        return;
      }

      this.logger.log(`${query} -- Parameters: ${this.stringifyParameter(parameters)}`);
    }


  }
  logQueryError(error: string, query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.error(`${query} -- Parameters: ${this.stringifyParameter(parameters)} -- ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.warn(`Time: ${time} -- Parameters: ${this.stringifyParameter(parameters)} -- ${query}`);
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  logSchemaBuild(message: string) {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: string, queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    if (level === 'log') {
      return this.logger.log(message);
    }
    if (level === 'info') {
      return this.logger.debug(message);
    }
    if (level === 'warn') {
      return this.logger.warn(message);
    }
  }

  private stringifyParameter(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters)
    } catch {
      return '';
    }
  }
}