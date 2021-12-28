import { UserDataDto } from "src/auth/dto/user-data.dto";
import { UserLoginDto } from "src/auth/dto/user-login.dto";
import { User } from "src/auth/user.entity";

export const toUserLoginDataDto = (data: User): UserDataDto => {
    // here i do the mapping from user entity to user data dto to filter the sensitive data

    // deconstructing user data for further usage
    const { id, username, email, first_name, last_name, is_active } = data;
    // initialize the userdatadto with the deconstructed userdata variables
    let userDataDto: UserDataDto = { id, username, email, first_name, last_name, is_active };
    return userDataDto;
}