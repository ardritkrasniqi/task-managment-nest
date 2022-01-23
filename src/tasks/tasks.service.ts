/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-12-10 23:23:36
 */
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/users/user.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }
    //TODO get the tasks from the db 

   
    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User
        ): Promise<Task[]>{
        //get tasks either filtered or all
        const tasks = await this.taskRepository.getTasks(filterDto, user);


        return tasks;
    }


    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOneOrFail(id);
        return found;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
        ): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto, user);
    }



    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (!result.affected){
            throw new NotFoundException(`Task with ID ${id} does not exist!`);
        } 
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
}
