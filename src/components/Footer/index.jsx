import styles from "./Footer.module.css"
import { developers } from "../../data"
import Developer from "../Developer"

function Footer() {
    return (
        <footer className={styles.footer}>
             <h2>Desenvolvedores</h2>
             <ul className={styles.developers}>
                {developers.map(developer => 
                    <li key={developer.name}>
                        <Developer dev={developer} />
                    </li>)}
             </ul>
        </footer>
    )
}

export default Footer