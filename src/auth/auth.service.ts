/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:38:43 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 16:51:19
 */
import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }


    async login(userLoginDto: UserLoginDto): Promise<User> {
        const payload = userLoginDto;
        let token = this.jwtService.sign(userLoginDto.email);
        return await this.authRepository.login(userLoginDto)
    }



    async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
        return await this.authRepository.registerUser(registerUserDto);
    }


    private _createToken({ email }: UserDataDto): any {
        const expiresIn = process.env.EXPIRESIN;

        const user: JwtPayload = { email };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken,
        };
    }




}
