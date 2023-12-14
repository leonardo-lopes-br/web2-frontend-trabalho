import styles from "./Favorites.module.css"
import { useFavorites } from "../../FavoritesContext"
import Poster from "../../components/Poster"
import { Link } from "react-router-dom"


function Favorites() {

    const { favorites } = useFavorites()

    return (
        <main className={styles.main_container}>
            <h1>Favoritos</h1>
            {(!favorites || favorites.length > 0) &&
                <ul className={styles.contentList}>
                    {favorites.map(favorito => <li key={favorito.id}> <Poster content={favorito} fav /> </li>)}
                </ul>
            }
            
            {favorites && favorites.length === 0 &&
                <div className={styles.emptyListContainer}>
                    <svg width="100px" height="100px" viewBox="0 0 32 32" fill="currentColor" role="presentation" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd" sketch:type="MSPage">
                                <g id="icon-86-document-list" sketch:type="MSArtboardGroup" fill="currentColor">
                                    <path d="M19.5,3 L9.00276013,3 C7.89666625,3 7,3.89833832 7,5.00732994 L7,27.9926701 C7,29.1012878 7.89092539,30 8.99742191,30 L24.0025781,30 C25.1057238,30 26,29.1017876 26,28.0092049 L26,10.5 L26,10 L20,3 L19.5,3 L19.5,3 L19.5,3 Z M19,4 L8.9955775,4 C8.44573523,4 8,4.45526288 8,4.99545703 L8,28.004543 C8,28.5543187 8.45470893,29 8.9999602,29 L24.0000398,29 C24.5523026,29 25,28.5550537 25,28.0066023 L25,11 L20.9979131,11 C19.8944962,11 19,10.1134452 19,8.99408095 L19,4 L19,4 Z M20,4.5 L20,8.99121523 C20,9.54835167 20.4506511,10 20.9967388,10 L24.6999512,10 L20,4.5 L20,4.5 Z M15,14 L15,15 L23,15 L23,14 L15,14 L15,14 Z M10,13 L10,16 L13,16 L13,13 L10,13 L10,13 Z M11,14 L11,15 L12,15 L12,14 L11,14 L11,14 Z M10,18 L10,21 L13,21 L13,18 L10,18 L10,18 Z M11,19 L11,20 L12,20 L12,19 L11,19 L11,19 Z M15,19 L15,20 L23,20 L23,19 L15,19 L15,19 Z M10,23 L10,26 L13,26 L13,23 L10,23 L10,23 Z M11,24 L11,25 L12,25 L12,24 L11,24 L11,24 Z M15,24 L15,25 L23,25 L23,24 L15,24 L15,24 Z" id="document-list" sketch:type="MSShapeGroup"></path>
                                </g>
                        </g>
                    </svg>
                    <span>Lista vazia</span>
                    <Link to={'/'}>Navegar</Link>
                </div>
            }
            
            
        </main>
    )
}

export default Favorites