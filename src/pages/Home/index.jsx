import styles from "./Home.module.css"
import PostersList from "../../components/PostersList"
import { postersInfo } from "../../data"
import { useFavorites } from "../../FavoritesContext"
import { useEffect } from "react"

function Home() {
    const { favorites } = useFavorites()

    // apenas para re-renderizar a Home e conseguir atualizar Posters iguais em diferentes PostersList
    // toda vez que os favoritos mudarem
    useEffect(() => {}, [favorites])
    
    return (
        <main className={styles.main_container}>
            {postersInfo.map((posterInfo) => <PostersList
                                                key={posterInfo.sectionTitle}
                                                info={posterInfo}
                                            />
                            )
            }            
        </main>
    )
}

export default Home