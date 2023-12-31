import styles from './ContentDetails.module.css'

import MyLoader from '../../components/MyLoader'

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { uniqueContentQuerys } from '../../data'

import { useFavorites } from '../../FavoritesContext'

function ContentDetails({ type }) {

    const [contentDetails, setContentDetails] = useState({})
    const [timeContent, setTimeContent] = useState({})
    const [dateContent, setDateContent] = useState('')
    const [contentLoaded, setContentLoaded] = useState(false)
    const [trailerLink, setTrailerLink] = useState('')
    const [isFavorite, setIsFavorite] = useState(false)

    const navigate = useNavigate()
    const contentObject = useParams()

    const { favorites, toggleFavorites } = useFavorites()


    useEffect(() => {
        if (contentDetails.id && favorites) {
            setIsFavorite(favorites.find(fav => fav.id === contentDetails.id))
        }
            
        if (contentDetails.videos && contentDetails.videos.results) {
            const videosList = contentDetails.videos.results
            let trailerObject = videosList.find(video => video.type.toLowerCase() === 'trailer')
            // se não tiver trailer, pega qualquer video que seja o primeiro
            if (!trailerObject) {
                trailerObject = videosList[0]
            }
            
            if (trailerObject) {
                const trailerHost = trailerObject.site.toLowerCase()
                const trailerKey = trailerObject.key
                if (trailerHost === 'youtube')
                    setTrailerLink(`https://${trailerHost}.com/embed/${trailerKey}`)
                else if (trailerHost === 'vimeo')
                    setTrailerLink(`https://${trailerHost}.com/${trailerKey}`)
            }
 
        }
    }, [contentDetails, favorites])

    async function fetchContentDetails() {
        const contentId = Number(`${type === 'movie' ? contentObject.movie_id : contentObject.series_id}`)
        if (isNaN(contentId)) {
            navigate('/')
        }
        else {
            const my_query = uniqueContentQuerys.find(query => query.type === type)
            const queryUrl = my_query.baseUrl.replace('<content_id>', String(contentId))
            const queryOptions = my_query.reqOptions
            try {
                const my_content = await fetch(queryUrl, queryOptions);
        
                if (!my_content.ok) {
                    navigate('/');
                    return;
                }
        
                const resultQuery = await my_content.json();
                
                
                if (type === 'movie' && resultQuery.runtime) {
                    const hours = Math.floor(resultQuery.runtime / 60)
                    const minutes = resultQuery.runtime - hours * 60
                    setTimeContent({hours: hours, minutes: minutes})

                    const data = resultQuery.release_date ? String(new Date(resultQuery.release_date).getFullYear()) : ''
                    if (data) {
                        setDateContent(data)
                    }
                }
                else if (type === 'series' && resultQuery.episode_run_time && resultQuery.episode_run_time.length > 0) {
                    const hours = Math.floor(resultQuery.episode_run_time[0] / 60)
                    const minutes = resultQuery.episode_run_time[0] - hours * 60
                    setTimeContent({hours: hours, minutes: minutes})

                    const data = resultQuery.first_air_date ? String(new Date(resultQuery.first_air_date).getFullYear()) : ''
                    if (data) {
                        setDateContent(data)
                    }
                }



                
                setContentDetails(resultQuery);
                setContentLoaded(true)

            }
            catch  {
                navigate('/');
            }
        }  
    }


    useEffect(() => {
        fetchContentDetails()
    }, [])


    function handleFavoriteButtonClick() {
        toggleFavorites(contentDetails)
        setIsFavorite(prev => !prev)
    }

    return (
        <>
            {!contentLoaded &&
                <div style={{textAlign: 'center'}}>
                    <MyLoader/>
                </div>
            }
            {contentLoaded &&
                <main className={styles.main_container} >
                    {/*Container para o background da imagem */}
                    <div className={styles.backgroundImageContainer}>
                        {
                            contentDetails.poster_path &&
                            <div className={styles.imgContainer} style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${contentDetails.poster_path}')`}}></div>
                        }
                        <div className={styles.blur}></div>
                    </div>
                    <h1>{`${type === 'movie' ? contentDetails.title : contentDetails.name}`}</h1>
                    
                    <div className={styles.initialInfoContainer}> {/**infos iniciais */}
                        <div className={styles.firstInfoContainer}>
                            <h2><span>Título original:</span> {`${type === 'movie' ? contentDetails.original_title : contentDetails.original_name}`}</h2>
                            <div className={styles.dateTimeContainer}>
                                {
                                    dateContent &&
                                    <span className={styles.date}>{dateContent}</span>
                                }
                                {
                                    timeContent && (timeContent.hours || timeContent.minutes) &&
                                    <span className={styles.time}>{timeContent.hours > 0
                                        ? `${String(timeContent.hours)} h ${String(timeContent.minutes).padStart(2, '0')} min`
                                        : `${String(timeContent.minutes).padStart(2, '0')} min`}
                                    </span>
                                }
                                
                            </div>
                        </div>
                        <div className={styles.secondInfoContainer}>
                            <div className={styles.ratingContainer}>
                                <span>Avaliação</span>
                                <span className={styles.numberRatingContainer}>
                                    <svg width="24" height="24" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                                    <div className={styles.numbers}>
                                        <span>
                                            {`${contentDetails.vote_average.toLocaleString("pt-BR", {maximumFractionDigits: 1, minimumFractionDigits: 1})}`}
                                        </span>
                                        <span>
                                            /10
                                        </span>
                                    </div>
                                    
                                </span>
                            </div>
                            <div className={styles.favoriteContainer}>
                                <span>Favorito</span>
                                <svg className={`${isFavorite ? styles.yellowStar : ''}`} onClick={handleFavoriteButtonClick} role="button" width="24" height="24" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={`${styles.imageVideoContainer} ${trailerLink ? '' : styles.imageWithoutVideo}`}>
                            {
                                contentDetails.poster_path &&
                                <img src={`https://image.tmdb.org/t/p/w500${contentDetails.poster_path}`} alt={`Poster de ${type === 'movie' ? contentDetails.title : contentDetails.name}`} />
                            }
                            {trailerLink && (
                                <div className={styles.iframeContainer}>
                                    <iframe
                                        src={trailerLink}
                                        allowFullScreen
                                        title={`Trailer de ${type === 'movie' ? contentDetails.title : contentDetails.name}`}
                                    ></iframe>
                                </div>
                                
                            )}
                            
                        </div>
                        <div className={`${styles.textInfoContainer} ${trailerLink ? '' : styles.genresWithoutVideo}`}>
                            <ul className={styles.genreList}>
                                {contentDetails.genres && contentDetails.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                            </ul>
                            <p className={styles.overview}>{contentDetails.overview}</p>
                        </div>
                    </div>
                    
                </main>
                
            }
        </>

    )
}

export default ContentDetails