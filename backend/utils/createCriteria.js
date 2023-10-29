export function createCriteria(input) {
    let fields = [
        "title",
        "release_date",
        "director.firstname",
        "director.lastname",
        "actors.firstname",
        "actors.lastname",
        "duration",
        "genres",
        "oscars",
        "box_office",
    ];

    let criteria = [];
    for (let key of fields) {
        criteria.push({ [key]: input });
    }

    return criteria;
}
