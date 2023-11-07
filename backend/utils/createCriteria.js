export function createCriteria(input) {
    let fields = [
        "title",
        "release_date",
        "director.firstname",
        "director.lastname",
        "producer.firstname",
        "producer.lastname",
        "actors.firstname",
        "actors.lastname",
        "duration",
        "genres",
        "oscars",
        "box_office",
    ];

    let criteria = [];
    for (let key of fields) {
        if (key === "duration" || key === "oscars" || key === "box_office") {
            criteria.push({ [key]: parseFloat(input) });
        } else {
            criteria.push({ [key]: input });
        }
    }

    return criteria;
}
