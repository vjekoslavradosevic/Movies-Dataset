import { connectToDatabase, closeConnection } from "./connection.js";
import jsonData from "./data/data.json" assert { type: "json" };

async function populateDB() {
    try {
        const database = await connectToDatabase();
        const collection = database.collection("movies");
        await collection.insertMany(jsonData);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        closeConnection();
    }
}

//populateDB()
