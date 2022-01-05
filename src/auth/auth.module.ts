import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthRepository } from './auth.repository';

@Module({

  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt', 
      property: 'users', 
      session: false
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      }
    }),
    TypeOrmModule.forFeature([AuthRepository]),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
