import { IsNotEmpty, IsString, isString } from "class-validator";

export class createTaskDto {
    
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty() 
    @IsString()
    description: string;
}
