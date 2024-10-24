import { Routes, Route } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";

// components
const Web = lazy(() => import("../Web/Web.jsx")); // Виправлено

// pages
const HomePage = lazy(() => import("../../pages/HomePage/HomePage")); // Виправлено
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage")); // Виправлено
const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage"),
); // Виправлено
const MovieDetailsPage = lazy(
  () => import("../../pages/MovieDetailsPage/MovieDetailsPage"),
); // Виправлено

function App() {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [error, setError] = useState(null);

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDI1NzVlNTk2YjEzNmYyYzk4OGEzNjQ2M2UxNzRmZCIsIm5iZiI6MTcyOTUzNjc0MC42OTk1NzYsInN1YiI6IjY3MTQxNDg1ZDViNzkyNmU5NDZmZTA3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jTgPStEYZjh4MsA1qbeGgH5B6_sBxrINBI03wjPe7zo";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
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

  const handleSearch = (query) => {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query,
    )}&language=en-US`;

    fetch(searchUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setSearchedMovies(data.results);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to search");
      });
  };

  return (
    <>
      <Web />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route
            path="/movies"
            element={
              <MoviesPage
                onSearch={handleSearch}
                searchedMovies={searchedMovies}
              />
            }
          />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
