/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:38:43 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 16:51:19
 */
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { UserDataDto } from '../users/dto/user-data.dto';
import { UserLoginDto } from '../users/dto/user-login.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginStatus } from './interfaces/login.interface';
import { UserRepository } from 'src/users/user.repository';
import { Connection } from 'typeorm';

@Injectable()
export class AuthService {

    private userRepository: UserRepository;

    constructor(
        private readonly configService: ConfigService,
        private readonly connection: Connection,
        private jwtService: JwtService
    ) {
        this.userRepository = this.connection.getCustomRepository(UserRepository);
    }


    async login(userLoginDto: UserLoginDto): Promise<LoginStatus> {
        const user = await this.userRepository.findByLogin(userLoginDto);
        // token generation and token signature
        const token = this._createToken(user);

        // construct the login status 
        return {
            email: user.email,
            ...token
        };
    }


    async validateUser(payload: JwtPayload): Promise<UserDataDto>{
        const user = this.userRepository.findByPayload(payload);

        // check if the user corresponds to the given payload from the token, if not throw an unauthenticated error
        if(!user){
            throw new UnauthorizedException('Invalid token!');
        }

        return user;
    }



    async registerUser(registerUserDto: RegisterUserDto): Promise<RegistrationStatus> {
        return await this.userRepository.registerUser(registerUserDto);
    }


    private _createToken({ id , email }: UserDataDto): any {
        const expiresIn = this.configService.get('EXPIRES_IN');

        const payload: JwtPayload = { id, email };
        const accessToken = this.jwtService.sign({ payload }, {
            expiresIn: this.configService.get('EXPIRES_IN'),
            secret: this.configService.get('TOKEN_SECRET_KEY')
        });
        return {
            expiresIn,
            accessToken,
        };
    }




}
