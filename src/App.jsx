import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from "./FavoritesContext";

import Footer from './components/Footer';
import Header from "./components/Header"

import Home from './pages/Home';
import Favorites from './pages/Favorites';
// import MovieDetails from './pages/MovieDetails';

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
        <Footer />
      </Router>
    </>
  )
}

export default App
