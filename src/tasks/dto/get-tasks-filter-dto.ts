import { ApiParam, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTasksFilterDto{

    @IsOptional()
    @ApiPropertyOptional({
        enum: ['OPEN', 'IN_PROGRESS', 'DONE']
    })
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @ApiPropertyOptional()
    @IsOptional()
    search: string;

}