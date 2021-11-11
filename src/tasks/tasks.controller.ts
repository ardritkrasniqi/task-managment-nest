/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:13 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-11-11 18:37:29
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { uptime } from 'process';
import { createTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';



@Controller('/tasks')
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        return  this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto): Task {
        return this.tasksService.createTask(createTaskDto); 
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string, 
        @Body('status') status: TaskStatus
        ): Task{
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void{
        return this.tasksService.deleteTask(id);
    }


}
