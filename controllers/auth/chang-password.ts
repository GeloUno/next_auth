import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client';
import { CollectionMongoDB_Enum } from '../../models/mongoDB/CollectionMongoDB';
import { compareUserPassword, hashUserPassword } from '../bcrypt/bcryptUser';
import { connectClientToMongoDB } from '../mongoDB/mongoDB';
import { IUser } from '../../models/user/IUser';
import { Collection } from 'mongodb';

export async function userChangePassword(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession({ req: req });


    if (!session || !session.user || !session.user.email) {
        return res.status(401).json({ message: "user not authenticated!" })
    }

    const userEmail = session.user.email
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    try {
        const { clientConnectToMongoDB, collection } = await connectClientToMongoDB(CollectionMongoDB_Enum.USERS)

        const userDataFromMongoDB: IUser | Collection<Document> | undefined = await collection.findOne({ email: userEmail }) as IUser | undefined


        if (!userDataFromMongoDB) {
            clientConnectToMongoDB.close()
            return res.status(422).json({ message: "user not exist" })
        }

        const isComparePassword = await compareUserPassword(oldPassword, userDataFromMongoDB.password);

        if (!isComparePassword) {
            clientConnectToMongoDB.close()
            return res.status(403).json({ message: "wrong user data" })
        }

        const userToHashPassword: IUser = {
            email: session.user.email,
            password: newPassword
        }

        const user = await hashUserPassword(userToHashPassword)

        userDataFromMongoDB


        const result = await collection.findOneAndUpdate({ email: userEmail }, { "$set": { password: user.password } })



        clientConnectToMongoDB.close()
        return res.status(200).json({ message: "User password update" })

    } catch (error) {
        return res.status(500).json({ message: "Error to connect database" })
    }

}
