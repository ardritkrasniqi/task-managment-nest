import { Task } from "./task.model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    public async getTaskById(id: number): Promise<Task> {
        const task = await this.findOne(id);
        return task;
    }


    public async getTasks(): Promise<Task[]> {  
        const tasks = await this.find();
        return tasks;
    }


    public async createTask(task: Task): Promise<Task> {
        const newTask = await this.save(task);
        return newTask;
    }
}