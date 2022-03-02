/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:38:43 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 16:51:19
 */
import { Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { UserDataDto } from '../users/dto/user-data.dto';
import { UserLoginDto } from '../users/dto/user-login.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginStatus } from './interfaces/login.interface';
import { UserRepository } from 'src/users/user.repository';
import { Connection } from 'typeorm';
import JwtPayload from './interfaces/jwt-payload.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {

    private userRepository: UserRepository;

    constructor(
        @Inject('MAIL_SERVICE') 
        private readonly client: ClientProxy,
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
        const user = await this.userRepository.findByPayload(payload);
        // check if the user corresponds to the given payload from the token, if not throw an unauthenticated error
        if(!user){
            throw new UnauthorizedException('Invalid token!');
        }

        return user;
    }



    async registerUser(registerUserDto: RegisterUserDto): Promise<RegistrationStatus> {
        const userRegistration = await this.userRepository.registerUser(registerUserDto);

        if (userRegistration['status'] == true){
            // user has been registered , send the activation email from the microservice
            const confirmUrl: string = this.configService.get('BASE_URL') + "verify?token=1234"; // token is hardcoded , TBD
            this.client.emit({cmd: 'send-message'}, {userRegistration, confirmUrl})
 
        }
        return userRegistration;
    }


    private _createToken({ id , email }: UserDataDto): any {
        const expiresIn = this.configService.get('EXPIRES_IN');

        const payload: JwtPayload = { id, email };
        const accessToken = this.jwtService.sign( payload , {
            expiresIn: parseInt(this.configService.get('EXPIRES_IN')),
            secret: this.configService.get('TOKEN_SECRET_KEY')
        });
        return {
            expiresIn,
            accessToken,
        };
    }




}
