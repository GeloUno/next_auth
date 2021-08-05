import { IUser } from '../../models/user/IUser';
import { IUserChangePassword } from '../fetcher/fecher';


export function isInValidUserData(user: IUser): boolean {

    if (!user.email ||
        !user.password ||
        user.email.trim() === "" ||
        user.password.trim() === '' ||
        !user.email.includes('@') ||
        user.password.trim().length < 7) {
        return true;
    }
    return false;
}

export function isInValidPasswords({ newPassword, oldPassword }: IUserChangePassword): boolean {

    if (
        !newPassword ||
        !oldPassword ||
        newPassword.trim() === "" ||
        oldPassword.trim() === '' ||
        newPassword.trim().length < 7 ||
        oldPassword.trim().length < 7
    ) {
        return true;
    }
    return false;
}
