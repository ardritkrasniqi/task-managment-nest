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

    public async updateTask(id: number, task: Task): Promise<Task> {
        const updatedTask = await this.save(task);
        return updatedTask;
    }

    public async deleteTask(id: number): Promise<void> {
        await this.delete(id);
    }

    public async getTasksByUserId(userId: number): Promise<Task[]> {
        const tasks = await this.find({ where: { userId: userId } });
        return tasks;
    }

    public async getTasksByUserIdAndStatus(userId: number, status: string): Promise<Task[]> {
        const tasks = await this.find({ where: { userId: userId, status: status } });
        return tasks;
    }
}