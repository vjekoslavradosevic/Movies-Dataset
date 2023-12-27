export function checkDatasetRefresh(req, res, next) {
    const scopes = req.auth.payload.scope;
    const scopesArray = scopes.split(" ");
    const hasRequiredScope = scopesArray.includes("refresh:dataset");

    if (hasRequiredScope) {
        next();
    } else {
        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(403).send({
            status: "Forbidden",
            message: "Required scopes not present.",
            response: null,
        });
        return;
    }
}
