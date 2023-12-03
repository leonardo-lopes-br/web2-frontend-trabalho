import Poster from "../Poster"
import styles from "./PostersList.module.css"
import { useEffect, useState } from "react"

function PostersList({ info }) {

    const [filmesEmDestaque, setFilmesEmDestaque] = useState({})

    async function searchContent() {
            const urlFilmesEmDestaque = `${info.baseUrl}`
            const optionsFilmesEmDestaque = info.reqOptions
            const filmesEmDestaquePromise = await fetch(urlFilmesEmDestaque, optionsFilmesEmDestaque)
            const filmesEmDestaque = await filmesEmDestaquePromise.json()
            setFilmesEmDestaque(() => filmesEmDestaque)
    }

   

    useEffect(() => {
        searchContent()
    }, [])

    return (
        <section className={styles.main_container}>
          <h2>{info.sectionTitle}</h2>
          <div className={styles.contentListContainer}>
              <ul className={styles.contentList}>
                {filmesEmDestaque.results && filmesEmDestaque.results.map((content) => 
                      <li key={content.id}>
                        <Poster content={{...content, image: 'Homer'}}/>
                      </li>
                )}
              </ul>
          </div>
        </section>
    )
}

export default PostersList