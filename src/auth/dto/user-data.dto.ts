import { isNotEmpty, IsNotEmpty } from "class-validator";

export class UserDataDto{
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    is_active: number;

}