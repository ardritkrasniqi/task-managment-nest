/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:39:05 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 16:38:54
 */
import { EntityRepository, Repository } from "typeorm";
import { RegisterUserDto } from "../auth/dto/register-user.dto";
import { User } from "./user.entity";
import { NotFoundException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User>{


    async getById(id: number){
        const user = this.findOne({ id });
        if (user){
            return user;
        }
        throw new NotFoundException('User with this id does not exist!');
    }

    async getByEmail(email: string){
        const user = this.findOne( { email })
        if (user){
            return user;
        }
        throw new NotFoundException('User with this email does not exist!');
    }

    
    
}