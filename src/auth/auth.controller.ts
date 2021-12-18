import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }



    @Post('/login')
    @UsePipes(ValidationPipe)
    login(
        @Body() userLoginDto: UserLoginDto
    ): Promise<User>{
        return this.authService.login(userLoginDto);
    }


    @Post('/register')
    @UsePipes(ValidationPipe)
    register(
        @Body() registerUserDto: RegisterUserDto
    ): Promise<User> {
        return this.authService.registerUser(registerUserDto);
    }


    @Post('/user/verify')
    @UsePipes(ValidationPipe)
    verifyAccount(
        @Param('token') token: string
    ): Promise<void>{
        return this.authService.verifyAccount(token);
    }


}
