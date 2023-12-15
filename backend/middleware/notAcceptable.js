import { splitAccept, acceptInSupported } from "../utils/splitAccept.js";
const supported_types = ["application/json", "*/*"];

//stavlja se samo na handlere koji salju podatke -> get (ali i head)
export function notAcceptable(req, res, next) {
    const accept = splitAccept(req.headers["accept"]);
    if (acceptInSupported(accept, supported_types)) {
        next();
        return;
    } else {
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(406).send({
            status: "Not Acceptable",
            message: "Server cannot respond with data in requested format",
            response: null,
        });
    }
}
