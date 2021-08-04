import { IUser } from '../../models/user/IUser';
import { hash, genSalt } from 'bcryptjs'


export async function hashUserPassword(user: IUser): Promise<IUser> {
    const salt = await genSalt(12)
    const hashPassord = await hash(user.password, salt)

    return {
        email: user.email,
        password: hashPassord
    }

}
