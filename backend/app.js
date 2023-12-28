import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db/connection.js";
import { notAcceptable } from "./middleware/notAcceptable.js";
import { unsupportedMediaType } from "./middleware/unsupportedMediaType.js";
import {
    getMoviesHandler,
    getMoviesHeadersHandler,
    postMovieHandler,
    optionsMoviesHandler,
    notImplementedHandler,
} from "./handlers/all_movies_handler.js";
import {
    getMovieHandler,
    putMovieHandler,
    deleteMovieHandler,
    optionsMovieHandler,
} from "./handlers/single_movie_handler.js";
import {
    getActorsHandler,
    getReviewsHandler,
    getGenresHandler,
    notImplementedRestHandler,
    notFoundHandler,
} from "./handlers/single_movie_collections_handler.js";
import { postSearchHandler } from "./handlers/search_handler.js";
import { auth } from "express-oauth2-jwt-bearer";
import { checkRefreshScope } from "./middleware/checkScope.js";
import { postRefreshHandler } from "./handlers/refresh_handler.js";

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
app.use(express.static("C:\\Users\\rados\\Documents\\Movies_dataset\\backend\\public"));

const jwtCheck = auth({
    audience: "http://localhost:3000",
    issuerBaseURL: "https://dev-xim66l7npdohtkc2.us.auth0.com/",
    tokenSigningAlg: "RS256",
});

//================ MOVIE COLLECTION ================
app.head("/api/movies", notAcceptable, async (req, res) => {
    await getMoviesHeadersHandler(req, res, coll);
});

app.get("/api/movies", notAcceptable, async (req, res) => {
    await getMoviesHandler(req, res, coll);
});

app.post("/api/movies", unsupportedMediaType, async (req, res) => {
    await postMovieHandler(req, res, coll);
});

app.options("/api/movies", optionsMoviesHandler);

app.put("/api/movies", notImplementedHandler);

app.delete("/api/movies", notImplementedHandler);

app.patch("/api/movies", notImplementedHandler);

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

app.options("/api/movies/:id", async (req, res) => {
    await optionsMovieHandler(req, res, coll);
});

app.post("/api/movies/:id", notImplementedHandler);

app.patch("/api/movies/:id", notImplementedHandler);

//================ COLLECTIONS UNDER SINGLE MOVIE ================
app.get("/api/movies/:id/actors", notAcceptable, async (req, res) => {
    await getActorsHandler(req, res, coll);
});

app.get("/api/movies/:id/reviews", notAcceptable, async (req, res) => {
    await getReviewsHandler(req, res, coll);
});

app.get("/api/movies/:id/genres", notAcceptable, async (req, res) => {
    await getGenresHandler(req, res, coll);
});

app.post("/api/movies/:id/:collection", notImplementedRestHandler);

app.put("/api/movies/:id/:collection", notImplementedRestHandler);

app.delete("/api/movies/:id/:collection", notImplementedRestHandler);

app.options("/api/movies/:id/:collection", notImplementedRestHandler);

app.patch("/api/movies/:id/:collection", notImplementedRestHandler);

//============= SEARCH FILTERS & DATASET REFRESH ==============
app.post("/search", async (req, res) => {
    await postSearchHandler(req, res, coll);
});

app.post("/refresh-dataset", jwtCheck, checkRefreshScope, async (req, res) => {
    await postRefreshHandler(req, res, coll);
});

//==================== CATCH-ALL HANDLERS =====================
app.get("*", notFoundHandler);
app.head("*", notFoundHandler);
app.post("*", notFoundHandler);
app.put("*", notFoundHandler);
app.delete("*", notFoundHandler);
app.options("*", notFoundHandler);
app.patch("*", notFoundHandler);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
