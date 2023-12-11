const encoder = new TextEncoder("utf-8");

export async function getMoviesHandler(req, res, coll) {
    try {
        let data = await coll.find().toArray();
        let message = "";
        if (data.length === 0) {
            message = "Fetched empty list. No movies found.";
        } else {
            message = "Fetched list of movies.";
        }
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(200).send({
            status: "OK",
            message: message,
            response: data,
        });
    } catch (error) {
        console.log(error);
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(500).send({
            status: "Internal Server Error",
            message: "Error on the server side.",
            response: null,
        });
    }
}

export async function getMoviesHeadersHandler(req, res, coll) {
    try {
        let data = await coll.find().toArray();
        let message = "";
        if (data.length === 0) {
            message = "Fetched empty list. No movies found.";
        } else {
            message = "Fetched list of movies.";
        }
        const byteLength = encoder.encode(
            JSON.stringify({
                status: "OK",
                message: message,
                response: data,
            })
        ).length;
        res.set("Content-Length", byteLength);
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

export async function postMovieHandler(req, res, coll) {
    try {
        if (Object.keys(req.body).length === 0) {
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(400).send({
                status: "Bad Request",
                message: "Request body is empty.",
                response: null,
            });
            return;
        }
        let movie = req.body;
        let existing_movies = await coll.find({ title: movie.title, release_date: movie.release_date }).toArray();
        if (existing_movies.length !== 0) {
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(422).send({
                status: "Unprocessable Content",
                message: "Movie already exists.",
                response: null,
            });
            return;
        }

        const insertedId = (await coll.insertOne({ ...movie })).insertedId.toString();
        res.set("Content-Type", "application/json; charset=utf-8");
        res.set("Location", "http://localhost:3000/api/movies/" + insertedId);
        res.status(201).send({
            status: "Created",
            message: "Movie successfully added.",
            response: movie,
        });
    } catch (error) {
        console.log(error);
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(500).send({
            status: "Internal Server Error",
            message: "Error on the server side.",
            response: null,
        });
    }
}

export function optionsMoviesHandler(req, res) {
    res.set("Allow", "GET, HEAD, POST, OPTIONS");
    res.status(200).end();
}

export function notImplementedHandler(req, res) {
    res.set("Content-Type", "application/json; charset=utf-8");
    res.status(501).send({
        status: "Not Implemented",
        message: "Method not implemented for requested resource",
        response: null,
    });
}
