import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url);

export async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
}

export function closeConnection() {
    client.close();
    console.log("MongoDB connection closed");
}
