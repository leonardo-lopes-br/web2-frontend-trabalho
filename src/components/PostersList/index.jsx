import ArrowButton from "../ArrowButton"
import Poster from "../Poster"
import styles from "./PostersList.module.css"
import { useEffect, useState, useRef } from "react"

function PostersList({ info }) {

    const [postersContent, setpostersContent] = useState({})
    const [containerScrollLeft, setContainerScrollLeft] = useState(0)
    const ref_contentList = useRef(null)

    async function searchContent() {
            const urlpostersContent = info.baseUrl
            const optionspostersContent = info.reqOptions
            const postersContentPromise = await fetch(urlpostersContent, optionspostersContent)
            const postersContentObject = await postersContentPromise.json()
            setpostersContent(postersContentObject)
    }


    useEffect(() => {
        searchContent()
    }, [])

    
    const scrollNext = () => {
      if (ref_contentList.current) {
        const scrollWidth = ref_contentList.current.scrollWidth
        const clientWidth = ref_contentList.current.clientWidth
        const maxScrollLeft = scrollWidth - clientWidth
        const nextScrollLeft = Math.min(ref_contentList.current.scrollLeft + clientWidth, maxScrollLeft)
        ref_contentList.current.scrollLeft = nextScrollLeft
        setContainerScrollLeft(() => nextScrollLeft)

      }
    }
  
    const scrollPrev = () => {
      if (ref_contentList.current) {
        const clientWidth = ref_contentList.current.clientWidth
        const nextScrollLeft = Math.max(ref_contentList.current.scrollLeft - clientWidth, 0)

        ref_contentList.current.scrollLeft = nextScrollLeft
        setContainerScrollLeft(() => nextScrollLeft)
      }
    }

  
    return (
        <section className={styles.main_container}>
          <h2>{info.sectionTitle}</h2>
          <div className={styles.contentListContainer}>
              {/*Só exibe a setinha da esquerda se já foi feito algum scroll para a direita*/}
              {containerScrollLeft !== 0 &&
                <ArrowButton scroll={() => scrollPrev()} direction="Left"/>
              }
              {/*Só exibe a setinha da direita se não chegou ao máximo scroll possível*/}
              { ref_contentList.current && containerScrollLeft !== (ref_contentList.current.scrollWidth - ref_contentList.current.clientWidth) &&
                <ArrowButton scroll={() => scrollNext()} direction="Right" />
              }
              <ul ref={ref_contentList} className={styles.contentList}>
                {postersContent.results && postersContent.results.map((content) => {       
                  return <li key={content.id}>
                            <Poster content={content}/>
                        </li>
                })}
              </ul>
          </div>
        </section>
    )
}

export default PostersList