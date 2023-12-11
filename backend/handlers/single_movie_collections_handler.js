import { ObjectId } from "mongodb";

export async function getActorsHandler(req, res, coll) {
    try {
        //provjera je li id ispravan
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

        //provjera postoji li film
        if (data.length === 0) {
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(404).send({
                status: "Not Found",
                message: "Movie does not exist.",
                response: null,
            });
            return;
        }

        let actors = data[0].actors;

        //filtriranje glumaca
        const { firstname, lastname } = req.query;
        if (firstname) {
            actors = actors.filter((a) => a.firstname.toLowerCase() === firstname.toLowerCase());
        }
        if (lastname) {
            actors = actors.filter((a) => a.lastname.toLowerCase() === lastname.toLowerCase());
        }

        let message = "";
        //provjera ima li film glumaca
        if (actors.length === 0) {
            message = "Fetched empty list. No actors found.";
        } else {
            //sve provjere uspješne
            message = "Fetched list of actors.";
        }
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(200).send({
            status: "OK",
            message: message,
            response: actors,
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

export async function getReviewsHandler(req, res, coll) {
    try {
        //provjera je li id ispravan
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

        //provjera postoji li film
        if (data.length === 0) {
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(404).send({
                status: "Not Found",
                message: "Movie does not exist.",
                response: null,
            });
            return;
        }

        let reviews = data[0].reviews;

        //filtriranje recenzija
        const score = parseFloat(req.query.score);
        if (score) {
            reviews = reviews.filter((r) => r.score === score);
        }

        let message = "";
        //provjera ima li film glumaca
        if (reviews.length === 0) {
            message = "Fetched empty list. No reviews found.";
        } else {
            //sve provjere uspješne
            message = "Fetched list of reviews.";
        }
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(200).send({
            status: "OK",
            message: message,
            response: reviews,
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

export async function getGenresHandler(req, res, coll) {
    try {
        //provjera je li id ispravan
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

        //provjera postoji li film
        if (data.length === 0) {
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(404).send({
                status: "Not Found",
                message: "Movie does not exist.",
                response: null,
            });
            return;
        }

        let genres = data[0].genres;
        let message = "";
        //provjera ima li film glumaca
        if (genres.length === 0) {
            message = "Fetched empty list. No genres found.";
        } else {
            //sve provjere uspješne
            message = "Fetched list of genres.";
        }
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(200).send({
            status: "OK",
            message: message,
            response: genres,
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

export function notImplementedRestHandler(req, res) {
    let collections = ["actors", "reviews", "genres"];
    if (collections.includes(req.params.collection)) {
        res.status(501).send({
            status: "Not Implemented",
            message: "Method not implemented for requested resource.",
            response: null,
        });
    } else {
        res.status(404).send({
            status: "Not Found",
            message: "Resource does not exist.",
            response: null,
        });
    }
}

export function notFoundHandler(req, res) {
    res.status(404).send({
        status: "Not Found",
        message: "Resource does not exist.",
        response: null,
    });
}
