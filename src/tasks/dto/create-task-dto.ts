import { IsNotEmpty, isString } from "class-validator";

export class createTaskDto {
    
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}
