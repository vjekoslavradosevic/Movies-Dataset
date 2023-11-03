import express from "express";
import cors from "cors";
import { connectToDatabase, closeConnection } from "./db/connection.js";
import { createCriteria } from "./utils/createCriteria.js";
import { turnToRegex } from "./utils/turnToRegex.js";

process.on("uncaughtException", function (err) {
    console.error(err);
    console.log("Continuing...");
});

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
        let everything = req.body.everything;
        let input = req.body.input;

        if (criteria.length === 0 && !everything) {
            console.log("No search filters applied.");
            res.status(400).send({ error: "No search filters applied." });
            return;
        }

        if (everything) {
            if (!isNaN(parseInt(input))) {
                input = parseInt(input);
            }
            criteria = createCriteria(input);
        }

        criteria = turnToRegex(criteria);

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
