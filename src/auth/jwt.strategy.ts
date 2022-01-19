import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserDataDto } from "src/users/dto/user-data.dto";
import { UserRepository } from "src/users/user.repository";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepostiory: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_SECRET_KEY
        });
    }




    async validate(payload: JwtPayload): Promise<UserDataDto> {
            
        const user = await this.userRepostiory.findByPayload(payload);
        if(!user){
            throw new UnauthorizedException("Invalid token!");
        }
        return user;
    }
}