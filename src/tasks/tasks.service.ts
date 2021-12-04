/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-12-03 14:34:26
 */
import { Injectable, NotFoundException } from '@nestjs/common';

import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { stat } from 'fs';

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
        console.log("Im called from the fucking filter");
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
        const task = this.taskRepository.findOne(id);
        this.taskRepository.delete(id)
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = new Task();
        this.taskRepository.update(id, task)
        return task;
    }
}
