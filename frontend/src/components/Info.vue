<template>
    <div class="grid grid-description">
        <div class="description box">
            <h2>Dataset Information</h2>
            <ul>
                <li>
                    <strong>Description:</strong> A collection of movie-related data for various purposes, such as
                    analysis, research, and application development. The dataset includes information about movies,
                    actors, directors, genres, release dates, ratings, and more.
                </li>
                <li><strong>Licence:</strong> Creative Commons Zero v1.0 Universal</li>
                <li><strong>Author:</strong> Vjekoslav Radošević</li>
                <li><strong>Dataset version:</strong> 1.0</li>
                <li><strong>Dataset language:</strong> English</li>
                <li><strong>Date and time format:</strong> ISO 8601</li>
                <li><strong>Publication date:</strong> 2023-10-22</li>
                <li><strong>Keywords:</strong> movies, film, actors, box office, oscars</li>
                <li><strong>Number of records:</strong> 10</li>
                <li><strong>Dataset formats:</strong> CSV, JSON</li>
            </ul>
        </div>

        <div class="description box">
            <h2>Dataset Attributes Description</h2>
            <ul>
                <li><strong>Title:</strong> The title of the movie</li>
                <li><strong>Release date:</strong> The date when the movie was officially released in theaters</li>
                <li>
                    <strong>Director:</strong> The director of the movie, responsible for overseeing the creative
                    aspects of the film
                </li>
                <li>
                    <strong>Producer:</strong> The producer of the movie, responsible for overseeing the complete
                    production of the film
                </li>
                <li><strong>Duration:</strong> The length of the movie in minutes</li>
                <li><strong>Actors:</strong> A list of key actors in the movie</li>
                <li><strong>Genres:</strong> A list of genres that describe the type of movie</li>
                <li><strong>Plot:</strong> A brief description of the movie's storyline</li>
                <li><strong>Reviews:</strong> A list of scores given by popular review platforms</li>
                <li><strong>Oscars:</strong> The number of Academy Awards (Oscars) won by the movie</li>
                <li>
                    <strong>Box office:</strong> The total revenue generated by the movie at the box office, in millions
                    of US dollars (USD)
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
.description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px auto;
    padding: 15px;
    border-radius: 5px;
    background-color: #a9fbd6fe;
}
.box {
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0;
}
.grid-description {
    height: 55vh;
}
</style>
