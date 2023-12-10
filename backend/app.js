import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db/connection.js";
import { ObjectId } from "mongodb";
import { createCriteria } from "./utils/createCriteria.js";
import { turnToRegex } from "./utils/turnToRegex.js";
import { notAcceptable } from "./middleware/notAcceptable.js";
import { unsupportedMediaType } from "./middleware/unsupportedMediaType.js";
import {
    getMoviesHandler,
    getMovieHeadersHandler,
    postMovieHandler,
    notImplementedHandler,
} from "./controllers/moviesController.js";

process.on("uncaughtException", function (err) {
    console.error(err);
    console.log("Continuing...");
});

const app = express();

let coll;
(async function initDB() {
    coll = await connectToDatabase();
})();

app.set("etag", false);
//middleware//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/movies", notAcceptable, async (req, res) => {
    await getMoviesHandler(req, res, coll);
});

app.head("/api/movies", notAcceptable, async (req, res) => {
    await getMovieHeadersHandler(req, res, coll);
});

app.post("/api/movies", unsupportedMediaType, async (req, res) => {
    await postMovieHandler(req, res, coll);
});

app.put("/api/movies", notImplementedHandler);

app.delete("/api/movies", notImplementedHandler);

app.get("/api/movies/:id", notAcceptable, async (req, res) => {
    try {
        let id = req.params.id;
        if (!ObjectId.isValid(id)) {
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(400).send({
                status: "Bad Request",
                message: "Given id is not valid.",
                response: null,
            });
            return;
        }

        id = new ObjectId(id);
        let data = await coll.find({ _id: id }).toArray();

        if (data.length === 0) {
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(404).send({
                status: "Not Found",
                message: "Movie does not exist.",
                response: null,
            });
        } else {
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(404).send({
                status: "OK",
                message: "Fetched single movie object.",
                response: data[0],
            });
        }
    } catch (error) {
        console.log(error);
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(500).send({
            status: "Internal Server Error",
            message: "Error on the server side.",
            response: null,
        });
    }
});

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
            criteria = createCriteria(input);
        }

        criteria = turnToRegex(criteria);

        if (criteria.length === 0) {
            console.log("No valuable search params given.");
            res.status(400).send({ error: "No valuable search params given." });
            return;
        }

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
