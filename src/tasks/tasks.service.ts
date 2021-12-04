/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-12-04 16:48:58
 */
import { Injectable, NotFoundException } from '@nestjs/common';

import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { response } from 'express';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }
    //TODO get the tasks from the db 

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getTasksWithFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasksWithFilter(filterDto);
    }


    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOneOrFail(id);
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto);
    }



    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (!result.affected){
            throw new NotFoundException(`Task with ID ${id} does not exist!`);
        }  
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = new Task();
        task.status = status;
        this.taskRepository.update(id, task)
        return task;
    }
}
