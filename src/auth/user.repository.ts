import { hash } from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from "./dto/user-login.dto";
import { ConflictException, ForbiddenException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User>{


    async login(userLoginDto: UserLoginDto): Promise<User>{
        // deconctruct the user login dto
        const { username, password} = userLoginDto;
        // check if a user with this username exists
        const user = await this.findOne( {username} )

        if(!user){
            throw new HttpException('User does not exist', 401);
        }  else if(user.is_active != 1){
            throw new ForbiddenException('Your email is not verified!');
        }
        // check if the input password matches the current password
        const isValidPassword = await bcrypt.compare(user.password, password);

        if(!isValidPassword){
            throw new UnauthorizedException("Username or Password is not valid!");
        } else {
            return user;
        }
    }



    async registerUser(registerUserDto: RegisterUserDto): Promise<void>{
        // deconstruct the registration dto
        const { username, password, email, first_name, last_name, age} = registerUserDto;
        const user = new User;

        // bind the data from the deconstucted dto
        
        user.username = username;
        // the generated salt from bcrypt
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        user.email = email;
        user.first_name = first_name;
        user.last_name = last_name;
        // save the user to db
        
        try {
            await user.save();
        } catch (error) {
            // just a simple check if its a server or client error, for some more clarity
            // code 23505 throws when if there is a duplicate entry for username
            if(error.code == "23505"){
                throw new ConflictException("Username already exists!");
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
    
}