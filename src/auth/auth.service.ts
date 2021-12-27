import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}


    async login(userLoginDto: UserLoginDto): Promise<User> {
        return await this.userRepository.login(userLoginDto)
    }



    async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        return await this.userRepository.registerUser(registerUserDto);
    } 



    
}
