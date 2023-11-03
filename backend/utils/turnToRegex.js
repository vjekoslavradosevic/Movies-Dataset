export function turnToRegex(criteria) {
    const flags = "i";

    for (let obj of criteria) {
        let key = Object.keys(obj)[0];
        if (!obj[key]) {
            const index = criteria.indexOf(obj);
            criteria[index] = undefined;
        } else {
            obj[key] = new RegExp(obj[key], flags);
        }
    }

    criteria = criteria.filter((item) => item);
    return criteria;
}
