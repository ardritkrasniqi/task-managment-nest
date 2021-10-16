/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi
 * @Last Modified time: 2021-10-16 23:44:17
 */
import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    
    private tasks: Task[] = [];


    getAllTasks(){
        return this.tasks;
    }

}
