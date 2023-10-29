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

app.post("/", async (req, res) => {
    try {
        let criteria = req.body.criteria;

        let data = await coll.find({ $or: criteria }, { projection: { _id: 0 } }).toArray();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status);
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
