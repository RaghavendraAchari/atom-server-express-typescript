import { MongoClient, ServerApiVersion, Db } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri: string = process.env.MONGOURL!;

let client: MongoClient = null!;
let db: Db = null!;

export async function connectToDatabase() {
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    db = await client.db(process.env.DB_NAME);

    console.log(`Successfully connected to database: ${db.databaseName}`);
}

export async function getDb() {
    if (db !== null || db !== undefined)
        return db;
    else {
        await connectToDatabase();
        return db;
    }
}

export function getConnectionObject() {
    if (client !== null)
        return client;
}