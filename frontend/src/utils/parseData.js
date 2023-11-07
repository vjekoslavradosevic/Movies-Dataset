export function parseData(data) {
    let movies = [];
    data.forEach((movie) => {
        let table_movie = {};
        table_movie["Title"] = movie["title"];
        table_movie["Release date"] = movie["release_date"];
        table_movie["Director"] = movie["director"]["firstname"] + " " + movie["director"]["lastname"];
        table_movie["Producer"] = movie["producer"]["firstname"] + " " + movie["producer"]["lastname"];
        table_movie["Duration"] = movie["duration"] + " minutes";

        let actors = "";
        movie["actors"].forEach((actor) => {
            actors += actor["firstname"] + " " + actor["lastname"] + "\n";
        });
        table_movie["Actors"] = actors.slice(0, -1);

        table_movie["Genres"] = movie["genres"].join("\n");
        table_movie["Oscars"] = movie["oscars"];
        table_movie["Box office"] = movie["box_office"] + " million USD";

        movies.push(table_movie);
    });
    return movies;
}
