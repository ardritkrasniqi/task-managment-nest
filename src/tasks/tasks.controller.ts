/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:44:13 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-12-03 14:17:06
 */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { uptime } from 'process';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import {TaskStatus } from './task-status.enum';



@Controller('/tasks')
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]>{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilter(filterDto);
        }
        return  this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto
        ): Promise<Task>{
        return this.tasksService.createTask(createTaskDto); 
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: number, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
        ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.tasksService.deleteTask(id);
    }


}
