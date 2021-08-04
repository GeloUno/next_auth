import { IUser } from '../../models/user/IUser';


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
