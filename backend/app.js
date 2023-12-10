import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db/connection.js";
import { createCriteria } from "./utils/createCriteria.js";
import { turnToRegex } from "./utils/turnToRegex.js";
import { notAcceptable } from "./middleware/notAcceptable.js";
import { unsupportedMediaType } from "./middleware/unsupportedMediaType.js";
import {
    getMoviesHandler,
    getMovieHeadersHandler,
    postMovieHandler,
    notImplementedHandler,
} from "./controllers/all_movies_controller.js";
import { getMovieHandler, putMovieHandler, deleteMovieHandler } from "./controllers/single_movie_controller.js";

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//================ MOVIE COLLECTION ================
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

//================ SINGLE MOVIE ================
app.get("/api/movies/:id", notAcceptable, async (req, res) => {
    await getMovieHandler(req, res, coll);
});

app.put("/api/movies/:id", unsupportedMediaType, async (req, res) => {
    await putMovieHandler(req, res, coll);
});

app.delete("/api/movies/:id", async (req, res) => {
    await deleteMovieHandler(req, res, coll);
});

app.post("/api/movies/:id", notImplementedHandler);

//================ COLLECTIONS UNDER SINGLE MOVIE ================
app.get("/api/movies/:id/actors", notAcceptable, async (req, res) => {
    await getActorsHandler(req, res, coll);
});

//================ SEARCH FILTERS ================
app.post("/search", async (req, res) => {
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
