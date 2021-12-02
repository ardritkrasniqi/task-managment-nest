import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {


    async getTasksWithFilter(getTasksWithFilter: GetTasksFilterDto): Promise<Task[]>{

        const { search, status } = getTasksWithFilter;

        const query = this.createQueryBuilder('task');

        if(search){
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%`});
        }

        if(status){
            query.andWhere('task.status = :status', { status });
        }

        const tasks = await query.getMany();

        return tasks;

    }

}