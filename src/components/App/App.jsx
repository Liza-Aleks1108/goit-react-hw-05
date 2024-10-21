import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Navigation from "../Navigation/Navigation";
import Web from "../Web/Web.jsx";

// pages
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

function App() {
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
    <>
      <Navigation />
      <Web />
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
