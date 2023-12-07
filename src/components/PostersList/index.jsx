import ArrowButton from "../ArrowButton"
import Poster from "../Poster"
import styles from "./PostersList.module.css"
import { useEffect, useState, useRef } from "react"

function PostersList({ info }) {

    const [postersContent, setpostersContent] = useState({})
    const [containerScrollLeft, setContainerScrollLeft] = useState(0)
    const [screenWidth, setScreenWidth] = useState((window.innerWidth > 0) ? window.innerWidth : screen.width)
    const [containerWidth, setContainerWidth] = useState(0)

    const ref_contentList = useRef(null)
    

    async function searchContent() {
            const urlpostersContent = info.baseUrl
            const optionspostersContent = info.reqOptions
            const postersContentPromise = await fetch(urlpostersContent, optionspostersContent)
            const postersContentObject = await postersContentPromise.json()
            setpostersContent(() => postersContentObject)
    }

    /*Atualizar o tamanho atual da tela*/
    useEffect(() => {
      const handleWindowResize = () => {
        setScreenWidth((window.innerWidth > 0) ? window.innerWidth : screen.width);
      };
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    });

    /*Obter os dados da API*/
    useEffect(() => {
        searchContent()
    }, [])

    /*Configurar o tamanho do container de posters*/
    useEffect(() => {
      const my_screen_width = (window.innerWidth > 0) ? window.innerWidth : screen.width
      let amountPosters
      if (my_screen_width <= 480)  // celular
        amountPosters = 1

      else if (my_screen_width > 480 && my_screen_width <= 768) // tablet
        amountPosters = 2
      else if (my_screen_width <= 1024) // laptop
        amountPosters = 3
      else (my_screen_width > 1024) // tela de tv
        amountPosters = Math.floor(my_screen_width * 0.9 / 250) // 0.9 pq é 90% da viewport e 250 pela largura dos posters
  
      setContainerWidth(() => amountPosters * 250 + (amountPosters + 1) * 16 + 2 * 32) /*4 * tamanho do Poster, 5 * valor do gap, 2 * padding*/

    }, [screenWidth])


    const scrollNext = () => {
      if (ref_contentList.current) {
        const scrollWidth = ref_contentList.current.scrollWidth
        const clientWidth = ref_contentList.current.clientWidth
        const maxScrollLeft = scrollWidth - clientWidth
        const nextScrollLeft = Math.min(ref_contentList.current.scrollLeft + clientWidth - 16, maxScrollLeft) /*-16 pra adicionar 1 gap de 1rem*/
        ref_contentList.current.scrollLeft = nextScrollLeft
        setContainerScrollLeft(() => nextScrollLeft)

      }
    }
  
    const scrollPrev = () => {
      if (ref_contentList.current) {
        const clientWidth = ref_contentList.current.clientWidth
        const nextScrollLeft = Math.max(ref_contentList.current.scrollLeft - clientWidth + 16, 0) /*+16 pra retirar 1 gap de 1rem*/

        ref_contentList.current.scrollLeft = nextScrollLeft
        setContainerScrollLeft(() => nextScrollLeft)
      }
    }

  
    return (
        <section className={styles.main_container}>
          <div className={styles.secondary_container}>
            <h2>{info.sectionTitle}</h2>
            <div className={styles.contentListContainer} style={{width: `${containerWidth}px`}}>
                {/*Só exibe a setinha da esquerda se já foi feito algum scroll para a direita*/}
                {containerScrollLeft !== 0 &&
                  <ArrowButton scroll={() => scrollPrev()} direction="Left"/>
                }
                {/*Só exibe a setinha da direita se não chegou ao máximo scroll possível*/}
                { ref_contentList.current && containerScrollLeft !== (ref_contentList.current.scrollWidth - ref_contentList.current.clientWidth) &&
                  <ArrowButton scroll={() => scrollNext()} direction="Right" />
                }
                <ul ref={ref_contentList} className={styles.contentList}>
                  {postersContent.results && postersContent.results.map(content => {      
                    return <li key={content.id}>
                              <Poster content={content}/>
                          </li>
                  })}
                </ul>
            </div>
          </div>
          
        
        </section>
    )
}

export default PostersList