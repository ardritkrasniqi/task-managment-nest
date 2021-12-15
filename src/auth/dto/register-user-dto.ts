import { Contains, IsEmail, IsInt, IsNotEmpty, IsOptional, MaxLength, maxLength } from "class-validator";

export class RegisterUserDto {


    @IsNotEmpty()
    @MaxLength(100)
    username: string;

    @IsNotEmpty()
    @MaxLength(255)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsInt()
    @IsOptional()
    age: number;
}