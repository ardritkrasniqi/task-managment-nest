/*
 * @Author: Ardrit Krasniqi 
 * @Date: 2021-10-16 23:16:40 
 * @Last Modified by: Ardrit Krasniqi
 * @Last Modified time: 2021-10-16 23:30:36
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    
    private tasks = ['Ardrit', 'fuck offfff'];


    getAllTasks(){
        return this.tasks;
    }

}
