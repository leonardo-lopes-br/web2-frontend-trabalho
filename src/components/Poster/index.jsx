import styles from "./Poster.module.css"
import { useFavorites } from "../../FavoritesContext"
import { Link } from "react-router-dom"



function Poster({ content, fav = false, type='movie'}) {

    const { toggleFavorites } = useFavorites()
    
    return (
        <div className={styles.main_container}>
            <Link to={`${type === 'movie' ? `/filmes/${content.id}` : `/series/${content.id}`}`}>
                <img
                    className={styles.contentImage}
                    src={`https://image.tmdb.org/t/p/w342/${content.poster_path}`}
                    loading="lazy"
                    width={'100%'}
                    height={'370px'}
                    alt={`Poster de ${type === 'movie' ? content.title : content.name}`}
                />
            </Link>
            <div className={styles.textContentContainer}>
                <div className={styles.contentRating}>
                    <svg width="15" height="15" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                    <span>{content.vote_average.toLocaleString("pt-BR", {maximumFractionDigits: 1, minimumFractionDigits: 1})}</span>
                </div>
                <Link to={`${type === 'movie' ? `/filmes/${content.id}` : `/series/${content.id}`}`} title={`${type === 'movie' ? content.title : content.name}`} className={styles.titleLink}>
                    <h3>{`${type === 'movie' ? content.title : content.name}`}</h3>
                </Link>
                <div className={styles.buttonsContainer}>
                    <button type="button" onClick={() => toggleFavorites(content)}>
                        {!fav && <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>}
                        {fav && <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64" fill="currentColor" role="presentation"><g id="Layer_20" data-name="Layer 20"><path d="M49.93,17.33H41.87V12a1.5,1.5,0,0,0-1.5-1.5H23.63a1.5,1.5,0,0,0-1.5,1.5v5.33H14.07a1.5,1.5,0,0,0,0,3H16V48a5.49,5.49,0,0,0,5.49,5.48h21.1A5.49,5.49,0,0,0,48,48V20.33h1.89A1.5,1.5,0,0,0,49.93,17.33ZM25.13,13.5H38.87v3.83H25.13ZM45,48a2.49,2.49,0,0,1-2.49,2.48H21.45A2.49,2.49,0,0,1,19,48V20.33H45Z"/><path d="M28,25.87a1.5,1.5,0,0,0-1.5,1.5V43.46a1.5,1.5,0,1,0,3,0V27.37A1.5,1.5,0,0,0,28,25.87Z"/><path d="M36,25.87a1.5,1.5,0,0,0-1.5,1.5V43.46a1.5,1.5,0,1,0,3,0V27.37A1.5,1.5,0,0,0,36,25.87Z"/></g></svg>}
                        <span>
                            {!fav && 'Adicionar aos favoritos'}
                            {fav && 'Remover dos favoritos'}
                        </span>
                    </button>
                    <Link to={`${type === 'movie' ? `/filmes/${content.id}` : `/series/${content.id}`}`}>Detalhes</Link>
                </div>
            </div>
        </div>
        
    )
}

export default Poster