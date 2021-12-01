/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-11-11 18:42:13
 */
import { Injectable, NotFoundException } from '@nestjs/common';

import { v1 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { title } from 'process';
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



    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status)
    //     } 
    //     if(search){
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    //     }
    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
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
