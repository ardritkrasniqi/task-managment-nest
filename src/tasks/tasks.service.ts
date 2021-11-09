/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-11-08 22:47:04
 */
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
    //TODO get the tasks from the db 
    private tasks: Task[] = [];


    getAllTasks(): Task[]{
        return this.tasks;
    }

    createTask(createTaskDto: createTaskDto): Task{
        const task: Task = {
            id: uuid(),
            title: createTaskDto.title, 
            description: createTaskDto.description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }
}
