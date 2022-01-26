import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto";
import { CreateTaskDto } from "./dto/create-task-dto";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/users/user.entity";
import { GetAllTasksDto } from "./dto/get-all-tasks-dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {


    async getTasks(
        taskFilterDto: GetTasksFilterDto,
        user: User
        ): Promise<GetAllTasksDto>{
        const { status, search } = taskFilterDto;
        const query = this.createQueryBuilder('tasks');

        query.where('tasks.userId = :userId', { userId : user.id})

        if(status){
            query.andWhere('tasks.status = :status', { status })
        }

        if(search){
            query.andWhere('tasks.title LIKE :search OR tasks.description LIKE :search', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return new GetAllTasksDto(tasks);
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
        ): Promise<Task>{
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();
        // remove the user property from task object
        delete task.user
        return task;
    }


}