import { Db, MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB=process.env.MONGODB_DB

let cashedClient: MongoClient;
let cashedDb: Db


export async function connectToDtabase() {
    if (cashedClient && cashedDb ) {
        return {
            client: cashedClient,
            db: cashedDb,
        };
    }

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    if (!MONGODB_URI) {
        throw new Error("Define the MONGODB_URI environmental variable")
    }

    if (!MONGODB_DB) {
        throw new Error("Define the MONGODB_Db environmental variable")
    }

    let client = new MongoClient(MONGODB_URI);
    await client.connect();

    let db = client.db(MONGODB_DB);
    cashedClient = client;
    cashedDb = db;

    return {
        client: cashedClient,
        db: cashedDb,
    };

}