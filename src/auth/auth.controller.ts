/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:39:21 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 16:49:54
 */
import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Res, StreamableFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Get('/test')
    getFile(): StreamableFile {
        const file = createReadStream(join(process.cwd(), '.env'));
        return new StreamableFile(file);
      }


    @Post('/login')
    @UsePipes(ValidationPipe)
    login(
        @Body() userLoginDto: UserLoginDto
    ): Promise<User>{
        return this.authService.login(userLoginDto);
    }


    @Post('/register')
    @UsePipes(ValidationPipe)
    register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
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
