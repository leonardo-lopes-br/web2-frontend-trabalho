import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from "./FavoritesContext";

import Footer from './components/Footer';
import Header from "./components/Header"

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import ContentDetails from './pages/ContentDetails';

function App() {
  

  return (
    <>
      <Router>
        <Header />
        <FavoritesProvider>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/:movie_id" element={<ContentDetails />} />
            <Route path="/erro404" element={<h1 style={{color: 'white'}}>teste de erro</h1>}/>
          </Routes>
        </FavoritesProvider>
        <Footer />
      </Router>
    </>
  )
}

export default App
