export function exportToJSON(data) {
    const str = JSON.stringify(data);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "movies.json";
    return link;
}

function createCSV(data) {
    let csv =
        "title;release_date;director_firstname;director_lastname;producer_firstname;producer_lastname;\
duration;actor_firstname;actor_lastname;genres;plot;metacritic_score;rotten_tomatoes_score;imdb_score;oscars;box_office\n";
    data.forEach((movie) => {
        let genres = movie.genres.join(",");
        movie.actors.forEach((actor) => {
            let redak = `${movie.title};${movie.release_date};${movie.director.firstname};${movie.director.lastname};\
${movie.producer.firstname};${movie.producer.lastname};${movie.duration};${actor.firstname};${actor.lastname};\
${genres};${movie.plot};${movie.reviews[0].score};${movie.reviews[1].score};${movie.reviews[2].score};${movie.oscars};${movie.box_office}\n`;

            csv += redak;
        });
    });

    return csv;
}

export function exportToCSV(data) {
    const str = createCSV(data);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
        type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "movies.csv";
    return link;
}

export function toCSV(str) {
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
        type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "movies.csv";
    return link;
}
