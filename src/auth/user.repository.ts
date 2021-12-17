import { hash } from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{



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