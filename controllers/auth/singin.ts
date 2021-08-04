import { NextApiRequest, NextApiResponse } from 'next';
import { CollectionMongoDB_Enum } from '../../models/mongoDB/CollectionMongoDB';
import { connectClientToMongoDB } from '../mongoDB/mongoDB';
import { IUser } from '../../models/user/IUser';
import { isInValidUserData } from '../mongoDB/isInValidUserData';
import { hashUserPassword } from '../bcrypt/bcryptUser';


export async function singInUserPost(req: NextApiRequest, res: NextApiResponse) {

    const userFromBody: IUser = req.body;


    if (isInValidUserData(userFromBody)) {
        return res.status(422).json({ error: "invalid user data email or passord" })
    }

    const user: IUser = await hashUserPassword(userFromBody)

    try {
        const { clientConnectToMongoDB, collection } = await connectClientToMongoDB(CollectionMongoDB_Enum.USERS)

        const result = await collection.findOne({ email: user.email })

        if (!result) {
            return res.status(404).json({ error: "user not exist" })
        }
        clientConnectToMongoDB.close()
        return res.status(201).json({ message: 'login user', userId: result.insertedId })
    } catch (error) {

        return res.status(500).json({ error: error.message || "Error connect to data base" })
    }
}