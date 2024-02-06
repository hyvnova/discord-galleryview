import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.DB_URI as string;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const DB_NAME = "Main"
const COLLECTION = "main" 

type Document = {
    channel_id: string;
    channel_name: string;
    images: string[]; // array of image ids = <image_id>/<image_name>
};

const get_db = async () => {
    await client.connect();
    const collection = client.db(DB_NAME).collection<Document>(COLLECTION);
    const db = await collection.find().toArray();
    return db;
}

const write_db = async (db: Document) => {
    await client.connect();
    const collection = client.db(DB_NAME).collection<Document>(COLLECTION);
    await collection.insertOne(db);
}

const gallery_exists = async (channel_id: string) => {
    await client.connect();
    const collection = client.db(DB_NAME).collection<Document>(COLLECTION);
    const gallery = await collection.findOne({ channel_id });
    return !!gallery;
}

const add_gallery = async (gallery: Document) => {
    await client.connect();
    const collection = client.db(DB_NAME).collection<Document>(COLLECTION);
    await collection.insertOne(gallery);
}

const get_gallery = async (channel_id: string) => {
    await client.connect();
    const collection = client.db(DB_NAME).collection<Document>(COLLECTION);
    const gallery = await collection.findOne({ channel_id });
    return gallery;
}

export { get_db, write_db, gallery_exists, add_gallery, get_gallery };