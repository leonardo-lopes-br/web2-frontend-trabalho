import styles from "./Poster.module.css"

function Poster({ content }) {

    console.log(content.image)
    return (
        <div>
            <a href="#"><img className={styles.contentImage} src={`https://image.tmdb.org/t/p/original/${content.poster_path}`} width={'250px'} alt={`Poster de ${content.title}`} /></a>
            <div className={styles.textContentContainer}>
                <div className={styles.contentRating}>
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                    <span>{content.vote_average.toLocaleString("pt-BR", {maximumFractionDigits: 1, minimumFractionDigits: 1})}</span>
                </div>
                <a title={content.title} className={styles.titleLink} href="#"><h3>{content.title}</h3></a>
                <div className={styles.buttonsContainer}>
                    <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>
                    <span>
                        Adicionar aos favoritos
                    </span>
                    </button>
                    <a href="#">Detalhes</a>
                </div>
            </div>
        </div>
        
    )
}

export default Poster