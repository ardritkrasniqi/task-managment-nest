import { hash } from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";
import { UserLoginDto } from "./dto/user-login.dto";
import { HttpException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{


    async login(userLoginDto: UserLoginDto){
        // deconctruct the user login dto
        const { username, password} = userLoginDto;
        // check if a user with this username exists
        const user = await this.findOne({where: {username}})

        if(!user){
            throw new HttpException('User does not exist', 401);
        }  else if(user.is_active != 1){
            throw new HttpException('Your email is not verified!', 400);
        }

        // check if the input password matches the current password
        
    }



    async registerUser(registerUserDto: RegisterUserDto){
        // deconstruct the registration dto
        const { username, password, email, first_name, last_name, age} = registerUserDto;
        const user = new User;

        // the generated salt from bcrypt
        const salt = await bcrypt.genSalt();
        // bind the data from the deconstucted dto
        user.username = username;
        user.password = await bcrypt.hash(password, salt);
        user.email = email;
        user.first_name = first_name;
        user.last_name = last_name;
        user.age = age;
        // save the user to db
        await user.save();
        return user;
    }
    
}