/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-06 23:48:19 
 * @Last Modified by:   Ardrit Krasniqi © 
 * @Last Modified time: 2022-01-06 23:48:19 
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({

  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
