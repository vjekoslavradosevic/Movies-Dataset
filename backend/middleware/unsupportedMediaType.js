const supported_types = ["application/json"];

//stavlja se samo na handlere koji citaju tijelo zahtjeva -> post i put
export function unsupportedMediaType(req, res, next) {
    const contentType = req.headers["content-type"];
    if (supported_types.includes(contentType)) {
        next();
        return;
    } else {
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(415).send({
            status: "Unsupported Media Type",
            message: "Given data cannot be interpreted",
            response: null,
        });
    }
}
