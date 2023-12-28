function addMovieMetadata(movie) {
    const actors = movie.actors.map((actor) => {
        return {
            "@type": "Person",
            ...actor,
        };
    });

    let aggregateScore = 0;
    movie.reviews.forEach((review) => {
        if (review.name === "IMDb") review.score *= 10;
        aggregateScore += review.score;
    });

    const aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: aggregateScore,
        reviewCount: movie.reviews.length,
    };

    return {
        "@type": "Movie",
        title: movie.title,
        release_date: movie.release_date,
        director: {
            "@type": "Person",
            firstname: movie.director.firstname,
            lastname: movie.director.lastname,
        },
        producer: {
            "@type": "Person",
            firstname: movie.producer.firstname,
            lastname: movie.producer.lastname,
        },
        duration: movie.duration,
        actor: actors,
        genre: movie.genres,
        plot: movie.plot,
        aggregateRating: aggregateRating,
    };
}

export function singleMovieMetadata(movie) {
    let movieWithMetadata = addMovieMetadata(movie);

    return {
        "@context": {
            "@vocab": "http://schema.org/",
            title: "name",
            release_date: "datePublished",
            firstname: "givenName",
            lastname: "familyName",
            plot: "description",
        },
        ...movieWithMetadata,
    };
}

export function allMoviesMetadata(movies) {
    let results = [];

    movies.forEach((movie) => {
        results.push(addMovieMetadata(movie));
    });

    return {
        "@context": {
            "@vocab": "http://schema.org/",
            title: "name",
            release_date: "datePublished",
            firstname: "givenName",
            lastname: "familyName",
            plot: "description",
        },
        "@type": "ItemList",
        itemListElement: results,
    };
}
