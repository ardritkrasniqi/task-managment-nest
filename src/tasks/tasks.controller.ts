/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:13 
 * @Last Modified by:   Ardrit Krasniqi 
 * @Last Modified time: 2021-10-16 23:44:13 
 */
import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(){
        return  this.tasksService.getAllTasks();
    }
}
