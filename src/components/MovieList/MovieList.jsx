import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";

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
    let isMounted = true;
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options,
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setMovies(data.results);
          //   console.log(data.results);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch movies");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
