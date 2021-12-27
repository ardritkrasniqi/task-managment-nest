import { hash } from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";
import { UserLoginDto } from "./dto/user-login.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ReturnFunctions } from "src/auth/return-functions";

@EntityRepository(User)
export class UserRepository extends Repository<User>{


    async login(userLoginDto: UserLoginDto): Promise<User>{
        // deconctruct the user login dto
        const { username, password} = userLoginDto;
        // check if a user with this username exists
        const user = await this.findOne({where: {username}})

        if(!user){
            throw new HttpException('User does not exist', 401);
        }  else if(user.is_active != 1){
            throw new HttpException('Your email is not verified!', HttpStatus.FORBIDDEN);
        }
        // check if the input password matches the current password
        const isValidPassword = await bcrypt.compare(user.password, password);

        if(!isValidPassword){
            throw new HttpException('Invalid credentials!', HttpStatus.UNAUTHORIZED);
        } else {
            return new ReturnFunctions().toUserDto(user)
        }
    }



    async registerUser(registerUserDto: RegisterUserDto): Promise<User>{
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
        // save the user to db
        await user.save();

        const registeredUser = new User;
        registeredUser.id = user.id;
        registeredUser.username = user.username;
        registeredUser.email = user.email;
        registeredUser.first_name = user.first_name;
        registeredUser.last_name = user.last_name;
        registeredUser.is_active = user.is_active;

        return registeredUser;
    }
    
}