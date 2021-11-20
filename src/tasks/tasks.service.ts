/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2021-11-11 18:42:13
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { title } from 'process';

@Injectable()
export class TasksService {
    //TODO get the tasks from the db 
    private tasks: Task[] = [];


    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
        const {status, search} = filterDto;
        let tasks = this.getAllTasks();
        
        if(status){
            tasks = tasks.filter(task => task.status === status)
        } 
        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }
        return tasks;
    }

    getTaskById(id: string): Task{
        const found =  this.tasks.find(task => task.id === id);
        // check for the found task if not found return Exception
        if(!found){
            throw new NotFoundException('Task not found')
        } else {
            return found;
        }
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
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id != found.id);
        
    }

    updateTaskStatus(id: string, status: TaskStatus): Task{
        // get the task with the desired id
        const task = this.getTaskById(id);
        // change the task status
        task.status = status;
        return task;
    }
}
