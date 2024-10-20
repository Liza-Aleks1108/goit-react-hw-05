import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";

function App() {
  // Токен доступу
  const url =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDI1NzVlNTk2YjEzNmYyYzk4OGEzNjQ2M2UxNzRmZCIsIm5iZiI6MTcyOTM2OTc2NS4wMDM3NzgsInN1YiI6IjY3MTQxNDg1ZDViNzkyNmU5NDZmZTA3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tka7tDycDDjFIHxMxD8A5zuv0L0zFwbXBh0eJUS2EVU",
    },
  };

  axios
    .get(url, options)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  // Токен доступу (кінець)

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
