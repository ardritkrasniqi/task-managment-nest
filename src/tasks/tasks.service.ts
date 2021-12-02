/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-12-02 19:12:34
 */
import { Injectable, NotFoundException } from '@nestjs/common';

import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

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


    // createTask(createTaskDto: createTaskDto): Task{
    //     const { title, description } = createTaskDto
    //     const task: Task = {
    //         id: uuid(),
    //         title, 
    //         description,
    //         status: TaskStatus.OPEN
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id: string): void{
    //     // find the task with current id
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id != found.id);

    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task{
    //     // get the task with the desired id
    //     const task = this.getTaskById(id);
    //     // change the task status
    //     task.status = status;
    //     return task;
    // }
}
