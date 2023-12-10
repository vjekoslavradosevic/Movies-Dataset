import { ObjectId } from "mongodb";

export async function getMovieHandler(req, res, coll) {
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
        } else {
            //sve provjere uspješne
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(200).send({
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
}

export async function putMovieHandler(req, res, coll) {
    try {
        //provjera je li tijelo prazno
        if (Object.keys(req.body).length === 0) {
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(400).send({
                status: "Bad Request",
                message: "Request body is empty.",
                response: null,
            });
            return;
        }

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
        } else {
            //sve provjere uspješne
            let updated_fields = req.body;
            await coll.updateOne({ _id: id }, { $set: updated_fields });
            res.set("Content-Type", "application/json; charset=utf-8");
            res.status(200).send({
                status: "OK",
                message: "Movie successfully updated.",
                response: null,
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
}

export async function deleteMovieHandler(req, res, coll) {
    try {
        //provjera je li id valjan
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
        await coll.deleteOne({ _id: id });
        res.status(204).end();
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
