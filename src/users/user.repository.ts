/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:39:05 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 16:38:54
 */
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import * as bcrypt from 'bcrypt';
import { toUserLoginDataDto } from "src/shared/mapper";
import { UserDataDto } from "src/users/dto/user-data.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { RegistrationStatus } from "src/auth/interfaces/registration-status.interface";
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

    async findByLogin({ email, password } : UserLoginDto): Promise<UserDataDto>{
        // check if a user with this username exists
        const user = await this.findOne( { email } )
        
        if(!user){
            throw new UnauthorizedException('User does not exist');
        }  else if(user.is_active != 1){
            throw new ForbiddenException('Your email is not verified!');
        }
        // check if the input password matches the current password
        const isValidPassword = (await bcrypt.hash(password, user.salt) === user.password) ? true : false;

        if(!isValidPassword){
            throw new UnauthorizedException("Invalid credentials!");
        } else {
            return toUserLoginDataDto(user);
        }
    }


    async registerUser(registerUserDto: RegisterUserDto): Promise<RegistrationStatus>{

        // defining the status if everything goes well this will be returned, if not , an error one will override it
        let status: RegistrationStatus = {
            status: true,
            message: 'Successfully registered'
        };

        // deconstruct the registration dto
        const { email, password, first_name, last_name} = registerUserDto;
        const user = new User;

        // bind the data from the deconstucted dto
        
        user.email = email;
        // the generated salt from bcrypt
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        user.first_name = first_name;
        user.last_name = last_name;
        user.salt = salt;
        // save the user to db
        
        try {
            await user.save();
        } catch (error) {
            // just a simple check if its a server or client error, for some more clarity
            // code 23505 throws when if there is a duplicate entry for username
            if(error?.code === PostgresErrorCodes.UNIQUE_VALUE_ERROR){
                throw new ConflictException("Email already exists!");
            } else {
                throw new InternalServerErrorException();
            }
        }
        return status;
    }

    
    
}