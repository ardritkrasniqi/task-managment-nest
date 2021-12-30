import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserLoginDataDto } from 'src/shared/mapper';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from '../users/user.entity';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}


    async login(userLoginDto: UserLoginDto): Promise<UserDataDto> {
        const payload = userLoginDto;
        let token = this.jwtService.sign(userLoginDto.username);
        return await this.userRepository.login(userLoginDto)
    }



    async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
        return await this.userRepository.registerUser(registerUserDto);
    } 



    
}
