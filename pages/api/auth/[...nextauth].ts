import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'
import { compareUserPassword } from '../../../controllers/bcrypt/bcryptUser';
import { connectClientToMongoDB } from '../../../controllers/mongoDB/mongoDB';
import { CollectionMongoDB_Enum } from '../../../models/mongoDB/CollectionMongoDB';
import { IUser } from '../../../models/user/IUser';
import { NextApiRequest } from 'next';


interface ICredentials extends Record<'email' | 'password', string> {

}

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({

            async authorize(credentials: ICredentials) {

                const { clientConnectToMongoDB, collection } = await connectClientToMongoDB(CollectionMongoDB_Enum.USERS)
                const user: IUser | undefined = await collection.findOne({ email: credentials.email }) as IUser | undefined
                if (!user) {
                    clientConnectToMongoDB.close()
                    throw new Error('No user found')
                }

                const isComparePassword = await compareUserPassword(credentials.password, user.password)

                if (!isComparePassword) {
                    clientConnectToMongoDB.close()
                    throw new Error('incorrect login data')
                }

                clientConnectToMongoDB.close()
                return { email: credentials.email }
            }
        })
    ]
})