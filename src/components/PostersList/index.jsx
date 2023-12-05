import Poster from "../Poster"
import styles from "./PostersList.module.css"
import { useEffect, useState, useRef } from "react"

function PostersList({ info }) {

    const [postersContent, setpostersContent] = useState({})
    const ref_contentList = useRef(null)
    const ref_iconArrowLeft = useRef(null)
    const ref_iconArrowRight = useRef(null)

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

        // Remove icone de setinha da direita
        ref_iconArrowRight.current.classList.toggle(styles.iconArrowVisible, nextScrollLeft !== maxScrollLeft)
        
        ref_iconArrowLeft.current.classList.add(styles.iconArrowVisible)
      }
    }
  
    const scrollPrev = () => {
      if (ref_contentList.current) {
        const clientWidth = ref_contentList.current.clientWidth
        const nextScrollLeft = Math.max(ref_contentList.current.scrollLeft - clientWidth, 0)

        ref_contentList.current.scrollLeft = nextScrollLeft

        // Remove icone de setinha da esquerda
        ref_iconArrowLeft.current.classList.toggle(styles.iconArrowVisible, nextScrollLeft !== 0)
        
        ref_iconArrowRight.current.classList.add(styles.iconArrowVisible)
      }
    }

    const hoverContentList = () => {
      const scrollWidth = ref_contentList.current.scrollWidth
      const clientWidth = ref_contentList.current.clientWidth
      const maxScrollLeft = scrollWidth - clientWidth

      // Exibe icone de setinha da esquerda
      if (ref_contentList.current.scrollLeft !== 0) {
        ref_iconArrowLeft.current.classList.add(styles.iconArrowVisible)
      }

      // Exibe icone de setinha da direita
      if (ref_contentList.current.scrollLeft !== maxScrollLeft) {
        ref_iconArrowRight.current.classList.add(styles.iconArrowVisible)
      }
  
    }

    const leaveContentList = () => {
      const scrollWidth = ref_contentList.current.scrollWidth
      const clientWidth = ref_contentList.current.clientWidth
      const maxScrollLeft = scrollWidth - clientWidth

      ref_iconArrowLeft.current.classList.remove(styles.iconArrowVisible)
      
      if (ref_contentList.current.scrollLeft === maxScrollLeft) {
        ref_iconArrowRight.current.classList.remove(styles.iconArrowVisible)
      }
      
    }

  
    return (
        <section className={styles.main_container}>
          <h2>{info.sectionTitle}</h2>
          <div className={styles.contentListContainer} onMouseEnter={hoverContentList} onMouseLeave={leaveContentList}>
              <button ref={ref_iconArrowLeft} onClick={scrollPrev} className={`${styles.contentListIconContainer} ${styles.iconArrowLeft}`}>
                <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
              </button>
              <button ref={ref_iconArrowRight} onClick={scrollNext} className={`${styles.contentListIconContainer} ${styles.iconArrowRight} ${styles.iconArrowVisible}`}>
                <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
              </button>
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