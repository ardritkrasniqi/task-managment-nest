import {  IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, maxLength, MinLength } from "class-validator";

export class RegisterUserDto {


    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(255)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'Password must contain :\"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number\"'
    })
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

}