/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:39:05 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 15:07:14
 */
import { EntityRepository, Repository } from "typeorm";
import { RegisterUserDto } from "../auth/dto/register-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from "../auth/dto/user-login.dto";
import { ConflictException, ForbiddenException, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { toUserLoginDataDto } from "src/shared/mapper";
import { UserDataDto } from "../auth/dto/user-data.dto";
import PostgresErrorCodes from "src/database/postgresErrorCodes.enum";


@EntityRepository(User)
export class UserRepository extends Repository<User>{


    async getById(id: number){
        const user = this.findOne({ id });
        if (user){
            return user;
        }
        throw new NotFoundException('User with this id does not exist!');
    }

    
    
}