import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from "./FavoritesContext";

import Footer from './components/Footer';
import Header from "./components/Header"

import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import ContentDetails from './pages/ContentDetails';
import Erro404 from './pages/Erro404';

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
            <Route path="/erro404" element={<Erro404 />}/>
          </Routes>
        </FavoritesProvider>
        <Footer />

        <ScrollToTop /> {/*Só pra voltar para o começo da página quando eu trocar de rota*/}
      </Router>
    </>
  )
}

export default App
