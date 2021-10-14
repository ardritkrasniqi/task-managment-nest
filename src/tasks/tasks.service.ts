import { Injectable } from '@nestjs/common';
import { response } from 'express';

@Injectable()
export class TasksService {
    
    private tasks = ['Ardrit', 'fuck offfff'];


    
    getAllTasks(){
        return this.tasks;
    }

}
