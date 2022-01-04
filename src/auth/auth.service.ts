/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:38:43 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 14:39:32
 */
import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthRepository)
        private readonly userRepository: AuthRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}


    async login(userLoginDto: UserLoginDto): Promise<UserDataDto> {
        const payload = userLoginDto;
        let token = this.jwtService.sign(userLoginDto.username);
        return await this.userRepository.login(userLoginDto)
    }



    async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
        return await this.registerUser(registerUserDto);
    } 



    
}
