import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isNotEmpty, IsNotEmpty, MinLength } from "class-validator";

export class UserLoginDto {


    @ApiProperty()

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string
}