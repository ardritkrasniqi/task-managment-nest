import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/user.repository';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({

  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt', 
      property: 'users', 
      session: false
    }),
    JwtModule.register({
      secret: "stupid secret key",
      signOptions: {
        expiresIn: 36000,
      }
    }),
    TypeOrmModule.forFeature([UserRepository]),
    UsersModule
  ],

  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
