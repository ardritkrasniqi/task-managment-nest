import { ConsoleLogger, Injectable } from "@nestjs/common";
import { ConsoleLoggerOptions } from "@nestjs/common/services/console-logger.service";
import { ConfigService } from "@nestjs/config";
import environmentLogLevels from "./getLogLevels";
import { Levels } from "./log-levels.enum";
import { LogsService } from "./logs.service";

@Injectable()
class CustomLogger extends ConsoleLogger {

    private readonly logsService: LogsService;


    constructor(
        context: string,
        options: ConsoleLoggerOptions,
        configService: ConfigService,
        logsService: LogsService
    ) {
        const environment = configService.get('NODE_ENVIRONMENT')

        super(
            context,
            {
                ...options,
                logLevels: environmentLogLevels(environment === 'production')
            }
        );
        this.logsService = logsService;
    }




    log(message: any, context?: string): void;
    log(message: any, ...optionalParams: any[]): void;
    log(message: any, context?: any, ...rest: any[]): void {
        super.log.apply(this, [message, context]);

        this.createLog(message, context, Levels.LOG);
    }


    error(message: any, stack?: string, context?: string): void;
    error(message: any, ...optionalParams: any[]): void;
    error(message: any, stack?: any, context?: any, ...rest: any[]): void {
        super.error.apply(this, [message, stack, context]);

        this.createLog(message, context, Levels.ERROR);
    }


    warn(message: any, context?: string): void;
    warn(message: any, ...optionalParams: any[]): void;
    warn(message: any, context?: any, ...rest: any[]): void {
        super.warn.apply(this, [message, context]);

        this.createLog(message, context, Levels.WARN);
    }


    debug(message: any, context?: string): void;
    debug(message: any, ...optionalParams: any[]): void;
    debug(message: any, context?: any, ...rest: any[]): void {
        super.debug.apply(this, [message, context]);

        this.createLog(message, context, Levels.DEBUG);
    }



    verbose(message: any, context?: string): void;
    verbose(message: any, ...optionalParams: any[]): void;
    verbose(message: any, context?: any, ...rest: any[]): void {
        super.verbose.apply(this, [message, context]);

        this.createLog(message, context, Levels.VERBOSE)
    }



    private createLog(message: any, context: any, level: string) {
        this.logsService.createLog({
            message,
            context,
            level
        })
    }

}