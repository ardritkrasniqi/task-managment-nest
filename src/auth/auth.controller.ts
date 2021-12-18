import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }




    @Post('/register')
    @UsePipes(ValidationPipe)
    register(
        @Body() RegisterUserDto: RegisterUserDto
    ): Promise<User> {
        return this.authService.registerUser(RegisterUserDto);
    }


}
