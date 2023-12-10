export function splitAccept(accept) {
    if (!accept) return [];
    let accept_list = accept.split(", ");
    let results = [];
    accept_list.forEach((item) => {
        let [type, q] = item.trim().split(";");
        results.push(type);
    });
    return results;
}

export function acceptInSupported(accept, supported) {
    let found = false;
    supported.forEach((type) => {
        if (accept.includes(type)) {
            found = true;
        }
    });
    return found;
}
