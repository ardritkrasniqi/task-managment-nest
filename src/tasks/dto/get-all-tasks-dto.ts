import { Task } from "../task.entity";

export class GetAllTasksDto{
    
    id: number;
    userId: number;
    title: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;


    // // todo assign the objects into array
    constructor(partial: Required<Task[]>){
        Object.assign(this, partial)
    }
}