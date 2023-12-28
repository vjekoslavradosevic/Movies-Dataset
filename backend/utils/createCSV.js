export function createCSV(data) {
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
