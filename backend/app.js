import express from "express";
import cors from "cors";
import { connectToDatabase, closeConnection } from "./db/connection.js";

let app = express();

let coll;
(async function initDB() {
    coll = await connectToDatabase();
})();

//middleware//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    let data = await coll.find({}, { projection: { _id: 0 } }).toArray();
    res.send(data);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
