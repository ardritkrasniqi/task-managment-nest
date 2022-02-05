import { ConsoleLogger,  Injectable } from "@nestjs/common";
import { ConsoleLoggerOptions } from "@nestjs/common/services/console-logger.service";
import { ConfigService } from "@nestjs/config";
import environmentLogLevels from "./getLogLevels";
import getLogLevels from "./getLogLevels";
import { LogsService } from "./logs.service";

@Injectable()
class CustomLogger extends ConsoleLogger {

    private readonly logsService: LogsService;

  constructor(
        context: string,
        options: ConsoleLoggerOptions,
        configService: ConfigService,
        logsService: LogsService
    ){
        const environment = configService.get('NODE_ENVIRONMENT')
        
        super(
            context, 
            {
                ...options, 
                logLevels: getLogLevels(environment === 'production')
            }
        );
        this.logsService = logsService;
    }


}