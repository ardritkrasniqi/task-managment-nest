/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-12-10 23:23:36
 */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/users/user.entity';
import { GetAllTasksDto } from './dto/get-all-tasks-dto';


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
        return await this.taskRepository.getTasks(filterDto, user);
        
    }


    async getTaskById(
        id: number, 
        user: User
        ): Promise<Task> {
        const task = await this.taskRepository.findOne({where: {id, userId: user.id}});
        if(!task){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return task;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
        ): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto, user);
    }



    async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id});
        if (!result.affected){
            throw new NotFoundException(`Task with ID "${id}" does not exist!`);
        } 
    }

    async updateTaskStatus(id: number, user: User,  status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
}
