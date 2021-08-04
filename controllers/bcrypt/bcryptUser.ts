import { IUser } from '../../models/user/IUser';
import { hash, genSalt, compare } from 'bcryptjs'


export async function hashUserPassword(user: IUser): Promise<IUser> {
    const salt = await genSalt(12)
    const hashPassord = await hash(user.password, salt)

    return {
        email: user.email,
        password: hashPassord
    }

}
export async function compareUserPassword(password: string, passwordHash: string): Promise<boolean> {
    const result = await compare(password, passwordHash)
    return result
}
