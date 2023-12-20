import styles from './SearchResults.module.css'

import { useEffect, useState } from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { filteredContent } from '../../data'

import { useFavorites } from "../../FavoritesContext"

import { v4 as uuid } from 'uuid';

import Poster from '../../components/Poster'

function SearchResults() {


    const [contents, setContents] = useState({
        movies: {},
        series: {},
    })
    const [pages, setPages] = useState({
        page_movies: 0,
        page_series: 0,
    })


    const { favorites } = useFavorites()

    const { state } = useLocation()
    const { query } = useParams()

    // o parametro com o padrão de filtro vazio é pra quando o usuario digitar diretamente
    // na URL a pesquisa em vez de "passar" pelo input do componente header
    async function searchContent(filter='') {
        // pesquisa por tudo
        if (filter === '' || filter === state.results.filterTitles[0]) {
            const movieFilter = filteredContent.find(item => item.content_type === 'movie')
            const tvFilter = filteredContent.find(item => item.content_type === 'tv')

            
            const movieQuery = await fetch(movieFilter.baseUrl.replace('<query>', query), movieFilter.reqOptions)
            const movieQueryJSON = await movieQuery.json()
            
            const tvQuery = await fetch(tvFilter.baseUrl.replace('<query>', query), tvFilter.reqOptions)
            const tvQueryJSON = await tvQuery.json()
            
            setContents({movies: movieQueryJSON, series: tvQueryJSON})
            setPages({page_movies: 1, page_series: 1})

            
        }
        // desktop com algum filtro
        else {
            // só filmes
            if (filter === state.results.filterTitles[1]) {
                const movieFilter = filteredContent.find(item => item.content_type === 'movie')
                const movieQuery = await fetch(movieFilter.baseUrl.replace('<query>', query), movieFilter.reqOptions)
                const movieQueryJSON = await movieQuery.json()
                setContents({movies: movieQueryJSON})
                setPages({page_movies: 1, page_series: 0})
               
            }

            // só tv series
            else if (filter === state.results.filterTitles[2]) {
                const tvFilter = filteredContent.find(item => item.content_type === 'tv')
                const tvQuery = await fetch(tvFilter.baseUrl.replace('<query>', query), tvFilter.reqOptions)
                const tvQueryJSON = await tvQuery.json()
                setContents({series: tvQueryJSON})
                setPages({page_movies: 0, page_series: 1})
            }
        }
        
    }

   
    useEffect(() => {
         // Usuário tentou acessar a url diretamente, sem uma pesquisa pelo input do header
        if (!state || !state.results) {
            searchContent()
        }

        else {
            searchContent(state.results.filter)
        }
        
    }, [state])
    

    async function seeMoreMovies() {
        const movieFilter = filteredContent.find(item => item.content_type === 'movie')
        const url = movieFilter.baseUrl.replace('<query>', query) + `&page=${pages.page_movies}`
        const newMovieQuery = await fetch(url, movieFilter.reqOptions)
        const newMovieQueryJSON = await newMovieQuery.json()
        
        setContents(prev => {
            return {
                ...prev,
                movies: {
                    ...prev.movies,
                    results: [...prev.movies.results, ...newMovieQueryJSON.results]
                },
            }
        })
    }

    async function seeMoreSeries() {
        const tvFilter = filteredContent.find(item => item.content_type === 'tv')
        const url = tvFilter.baseUrl.replace('<query>', query) + `&page=${pages.page_series}`
        const newTvQuery = await fetch(url, tvFilter.reqOptions)
        const newTvQueryJSON = await newTvQuery.json()
        
        setContents(prev => {
            return {
                ...prev,
                series: {
                    ...prev.series,
                    results: [...prev.series.results, ...newTvQueryJSON.results]
                },
            }
        })
    }

    useEffect(() => {
        if (pages.page_movies > 1) {
            seeMoreMovies()
        }

        if (pages.page_series > 1) {
            seeMoreSeries()
        }
    }, [pages])

    function handleSeeMoreContent(type='movies') {
        setPages((prev) => {
            return {
              ...prev,
              [type === 'movies' ? 'page_movies' : 'page_series']: prev[type === 'movies' ? 'page_movies' : 'page_series'] + 1,
            };
          });
    }
   

    return (
        <main className={styles.main_container}>
            <h1>Pesquisa "{query}"</h1>
                {/*Exibe os filmes quando convém */}
                {contents.movies && contents.movies.results && contents.movies.results.length > 0 &&
                    <section className={styles.section}>
                        <h2>Filmes</h2>
                        <ul className={styles.contentList}>
                            {
                                contents.movies.results.map(item => {
                                    let fav = false
                                    if (favorites)
                                        fav = favorites.some(fav_item => fav_item.id === item.id)
                                    return <li key={item.id + uuid()}>
                                            <Poster content={item} fav={fav}/>
                                        </li>
                                })
                            }
                        </ul>
                        {
                            contents.movies && pages.page_movies !== contents.movies.total_pages && 
                                <button onClick={() => handleSeeMoreContent('movies')} className={styles.buttonSeeMore} type='button'>
                                    Exibir mais
                                </button>
                        }
                        
                    </section>
                }
                {/*Exibe as séries quando convém */}
                {contents.series && contents.series.results && contents.series.results.length > 0 &&
                    <section className={styles.section}>
                        <h2>Séries</h2>
                        <ul className={styles.contentList}>
                            {
                                contents.series.results.map(item => {
                                    let fav = false
                                    if (favorites)
                                        fav = favorites.some(fav_item => fav_item.id === item.id)
                                    return <li key={item.id + uuid()}>
                                            <Poster content={item} fav={fav} type='series'/>
                                        </li>
                                })
                            }
                        </ul>
                        {
                            contents.movies && pages.page_series !== contents.series.total_pages && 
                                <button onClick={() => handleSeeMoreContent('series')} className={styles.buttonSeeMore} type='button'>
                                    Exibir mais
                                </button>
                        }
                    </section>
                }
            
        </main>
    )
}

export default SearchResults