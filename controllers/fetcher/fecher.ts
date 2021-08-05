import { IUser } from '../../models/user/IUser';
export enum EndPointsUser_Enum {
    SIGNUP = 'signup',
    SIGNIN = 'signin',
}


export async function fetcherAuthUser(endPointsUser: EndPointsUser_Enum, userData: IUser) {
    try {

        const respons = await fetch(`/api/auth/${endPointsUser}`, {
            method: "POST",
            body: JSON.stringify({ ...userData }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await respons.json()

        if (!respons.ok) {
            throw { message: data.error }
        }

        return data

    } catch (error) {
        throw { message: error.message }
    }

}

export interface IUserChangePassword {
    newPassword: string,
    oldPassword: string
}

export async function fetcherChangeUserPassword(passwords: IUserChangePassword) {
    try {

        const respons = await fetch(`/api/user/change-password/`, {
            method: "PATCH",
            body: JSON.stringify({ ...passwords }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await respons.json()

        if (!respons.ok) {
            throw { message: data.message }
        }

        return data

    } catch (error) {
        throw { message: error.message }
    }

}

