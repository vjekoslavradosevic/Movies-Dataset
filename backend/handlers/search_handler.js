import { createCriteria } from "../utils/createCriteria.js";
import { turnToRegex } from "../utils/turnToRegex.js";

export async function postSearchHandler(req, res, coll) {
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
}
