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

    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: createTaskDto): Task{
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            title, 
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void{
        // find the task with current id
        this.tasks = this.tasks.filter(task => task.id != id)
    }
}
