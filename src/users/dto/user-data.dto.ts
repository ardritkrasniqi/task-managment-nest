import { IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";

export class UserDataDto{
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    is_active: number;

}