import { NextApiRequest, NextApiResponse } from 'next';
import { CollectionMongoDB_Enum } from '../../models/mongoDB/CollectionMongoDB';
import { connectClientToMongoDB } from '../mongoDB/mongoDB';
import { IUser } from '../../models/user/IUser';
import { isInValidUserData } from '../mongoDB/isInValidUserData';
import { hashUserPassword } from '../bcrypt/bcryptUser';


export async function singupUserPost(req: NextApiRequest, res: NextApiResponse) {

    const userFromBody: IUser = req.body;


    if (isInValidUserData(userFromBody)) {
        return res.status(422).json({ message: "invalid user data email or passord" })
    }

    const user = await hashUserPassword(userFromBody)

    try {
        const { clientConnectToMongoDB, collection } = await connectClientToMongoDB(CollectionMongoDB_Enum.USERS)

        const isUserExist = await collection.findOne({ email: user.email })

        if (isUserExist) {
            return res.status(404).json({ error: "user is already exist" })
        }

        const result = await collection.insertOne({ ...user })


        clientConnectToMongoDB.close()

        return res.status(201).json({ message: 'creata user', userId: result.insertedId })

    } catch (error) {

        return res.status(500).json({ message: error.message || "Error connect to data base" })
    }
}