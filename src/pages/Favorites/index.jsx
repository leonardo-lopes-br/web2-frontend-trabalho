import styles from "./Favorites.module.css"
import { useFavorites } from "../../FavoritesContext"
import Poster from "../../components/Poster"


function Favorites() {

    const { favorites } = useFavorites()

    return (
        <main className={styles.main_container}>
            <h1>Favoritos</h1>
            <ul className={styles.contentList}>
                {favorites && favorites.map(favorito => <li key={favorito.id}> <Poster content={favorito} fav /> </li>)}
            </ul>
            
        </main>
    )
}

export default Favorites