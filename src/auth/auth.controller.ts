/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:39:21 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 16:49:54
 */
import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Param, Post, Req, Res, StreamableFile, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserDto } from '../users/dto/register-user.dto'; 
import { UserLoginDto } from '../users/dto/user-login.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginStatus } from './interfaces/login.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user)
    }
    




    @HttpCode(200)
    @Post('/login')
    @UsePipes(ValidationPipe)
    login(
        @Body() userLoginDto: UserLoginDto
    ): Promise<LoginStatus> {
        return this.authService.login(userLoginDto);
    }


    @Post('/register')
    @UsePipes(ValidationPipe)
    register(@Body() registerUserDto: RegisterUserDto): Promise<RegistrationStatus> {
        return this.authService.registerUser(registerUserDto);
    }


    // @Post('/user/verify')
    // @UsePipes(ValidationPipe)
    // verifyAccount(
    //     @Param('token') token: string
    // ): Promise<void>{
    //     return this.authService.verifyAccount(token);
    // }


}
