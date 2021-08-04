import { Collection, Db, MongoClient } from "mongodb";
import { CollectionMongoDB_Enum } from '../../models/mongoDB/CollectionMongoDB';
import { URL_MONGODB } from '../../models/mongoDB/mongoDB';

export async function connectClientToMongoDB(collectionMongoDB: CollectionMongoDB_Enum): Promise<{ clientConnectToMongoDB: MongoClient, db: Db, collection: Collection }> {


    try {
        const clientConnectToMongoDB = await MongoClient.connect(URL_MONGODB);

        const db = await clientConnectToMongoDB.db()

        const collection = await db.collection(collectionMongoDB)

        return { clientConnectToMongoDB: clientConnectToMongoDB, db: db, collection: collection }

    } catch (error) {
        return error
    }

}
