export function turnToRegex(criteria) {
    const flags = "i";

    for (let obj of criteria) {
        let key = Object.keys(obj)[0];
        if (obj[key] === null) {
            const index = criteria.indexOf(obj);
            criteria[index] = undefined;
        } else if (typeof obj[key] === "string" && key !== "release_date" ) {
            obj[key] = new RegExp(obj[key], flags);
        }
    }

    criteria = criteria.filter((item) => item);
    return criteria;
}
