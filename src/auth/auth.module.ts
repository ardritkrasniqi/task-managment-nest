import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';

@Module({

  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt', 
      property: 'user', 
      session: false
    }),
    JwtModule.register({
      secret: 'justARandomSecret',
      signOptions: {
        expiresIn: 36000,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],

  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
