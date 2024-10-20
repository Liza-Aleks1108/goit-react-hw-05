import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDI1NzVlNTk2YjEzNmYyYzk4OGEzNjQ2M2UxNzRmZCIsIm5iZiI6MTcyOTM2OTc2NS4wMDM3NzgsInN1YiI6IjY3MTQxNDg1ZDViNzkyNmU5NDZmZTA3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tka7tDycDDjFIHxMxD8A5zuv0L0zFwbXBh0eJUS2EVU",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options,
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch movies");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;