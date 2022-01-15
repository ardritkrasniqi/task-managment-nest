/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:38:54 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 16:39:51
 */
import { UserDataDto } from "src/users/dto/user-data.dto";
import { User } from "src/users/user.entity";

export const toUserLoginDataDto = (data: User): UserDataDto => {
    // here i do the mapping from user entity to user data dto to filter the sensitive data

    // deconstructing user data for further usage
    const { id, email, first_name, last_name, is_active } = data;
    // initialize the userdatadto with the deconstructed userdata variables
    let userDataDto: UserDataDto = { id,  email, first_name, last_name, is_active };
    return userDataDto;
}