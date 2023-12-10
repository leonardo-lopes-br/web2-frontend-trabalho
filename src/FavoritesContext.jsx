import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')));

  function toggleFavorites(content) {
    
    setFavorites(prevFavorites => {
        // primeiro a ser salvo
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', JSON.stringify([content]))
            return [content]
        }
        else {
            // Já tem, vamos remover
            if (prevFavorites.includes(content)) {
                const newArray = prevFavorites.filter(favorite => favorite.id !== content.id)
                localStorage.setItem('favorites', JSON.stringify(newArray))
                return newArray
            }
            // Conteúdo novo nos favoritos
            else {
                const newArray = [...prevFavorites, content]
                localStorage.setItem('favorites', JSON.stringify(newArray))
                return newArray
            }
        }     
    })
}

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
