import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLogDto } from "./dto/createLog.dto";
import { Log } from "./log.entity";

@Injectable()
export  class LogsService {
    constructor(
        @InjectRepository(Log)
        private readonly logRespository: Repository<Log>
    ){}


    async createLog(log: CreateLogDto) {
        const newLog = this.logRespository.create(log);
        await this.logRespository.save(newLog, {
            // data is to avoid infinite looping. Explanation: We store log in DB -> that store, stores another log and on and on and on :P
          data: {
            isCreatingLogs: true
          }
        });
        return newLog;
      }
}