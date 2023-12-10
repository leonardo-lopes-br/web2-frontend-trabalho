import Header from "./components/Header"

import { BrowserRouter as Router, Routes, Route, useFormAction } from 'react-router-dom';
import Home from './pages/Home';
// import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from "./FavoritesContext";
import { useFavorites } from "./FavoritesContext";
import { useEffect } from "react";

function App() {


  return (
    <>
      <Router>
        <Header />
        <FavoritesProvider>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/favoritos" element={<Favorites />} />
            {/*<Route path="/:movie_id" element={<MovieDetails />} /> */}
          </Routes>
        </FavoritesProvider>
        
      </Router>
    </>
  )
}

export default App
