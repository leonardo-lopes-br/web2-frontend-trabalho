import styles from "./Home.module.css"
import PostersList from "../../components/PostersList"
import { postersInfo } from "../../data"

function Home() {
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