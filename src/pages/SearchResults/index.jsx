import styles from './SearchResults.module.css'

import { useEffect, useState } from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { filteredContent } from '../../data'

import { useFavorites } from "../../FavoritesContext"

import Poster from '../../components/Poster'

function SearchResults() {


    const [contents, setContents] = useState({})

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
            
            setContents({movies: movieQueryJSON, tvSeries: tvQueryJSON})

            
        }
        // desktop com algum filtro
        else {
            // só filmes
            if (filter === state.results.filterTitles[1]) {
                const movieFilter = filteredContent.find(item => item.content_type === 'movie')
                const movieQuery = await fetch(movieFilter.baseUrl.replace('<query>', query), movieFilter.reqOptions)
                const movieQueryJSON = await movieQuery.json()
                setContents({movies: movieQueryJSON})
               
            }

            // só tv series
            else if (filter === state.results.filterTitles[2]) {
                const tvFilter = filteredContent.find(item => item.content_type === 'tv')
                const tvQuery = await fetch(tvFilter.baseUrl.replace('<query>', query), tvFilter.reqOptions)
                const tvQueryJSON = await tvQuery.json()
                setContents({tvSeries: tvQueryJSON})
            }
        }
        
    }

    useEffect(() => {
        console.log(contents)
    }, [contents])

   
    useEffect(() => {
         // Usuário tentou acessar a url diretamente, sem uma pesquisa pelo input do header
        if (!state || !state.results) {
            searchContent()
        }

        else {
            searchContent(state.results.filter)
        }
        
    }, [state])
   

    return (
        <main className={styles.main_container}>
            <h1>Pesquisa "{query}"</h1>
                {/*Exibe os filmes quando convém */}
                {contents.movies && contents.movies.results &&
                    <section className={styles.section}>
                        <h2>Filmes</h2>
                        <ul className={styles.contentList}>
                            {
                                contents.movies.results.map(item => {
                                    let fav = false
                                    if (favorites)
                                    fav = favorites.some(fav_item => fav_item.id === item.id)
                                    return <li key={item.id}>
                                            <Poster content={item} fav={fav}/>
                                        </li>
                                })
                            }
                        </ul>
                    </section>
                }
                {/*Exibe as séries quando convém */}
                {contents.tvSeries && contents.tvSeries.results &&
                    <section className={styles.section}>
                        <h2>Séries</h2>
                        <ul className={styles.contentList}>
                            {
                                contents.tvSeries.results.map(item => {
                                    let fav = false
                                    if (favorites)
                                    fav = favorites.some(fav_item => fav_item.id === item.id)
                                    return <li key={item.id}>
                                            <Poster content={item} fav={fav} type='series'/>
                                        </li>
                                })
                            }
                        </ul>
                    </section>
                }
            
        </main>
    )
}

export default SearchResults