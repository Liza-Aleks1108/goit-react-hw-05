import { Routes, Route, useLocation } from "react-router-dom";

// components
import Navigation from "../Navigation/Navigation";

// pages
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

function App() {
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
