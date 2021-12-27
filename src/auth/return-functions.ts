import { last } from "rxjs";
import { UserDataDto } from "src/auth/dto/user-data.dto";
import { User } from "src/auth/user.entity";

export class ReturnFunctions{

    public toUserDto(userDataDto: UserDataDto) {
        const { id, username, email, first_name, last_name} = userDataDto;
        const user = new User();

        user.id = id
        user.username = username;
        user.email = email;
        user.first_name = first_name;
        user.last_name = last_name;

        return user;
    }
}