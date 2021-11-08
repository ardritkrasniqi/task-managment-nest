/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:13 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-11-08 22:13:09
 */
import { Controller, Get } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';



@Controller('/tasks')
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return  this.tasksService.getAllTasks();
    }
}
