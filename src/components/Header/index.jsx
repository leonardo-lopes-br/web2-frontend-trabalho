import { useState } from 'react';
import SearchContainer from '../SearchContainer';
import styles from './Header.module.css'
import { Link } from "react-router-dom";

function Header() {

    const [showSearchMobileOverlay, setShowSearchMobileOverlay] = useState(false);
    const [inputs, setInputs] = useState({
        mobileInput: '',
        desktopInput: ''
    })

    function evalQuery (filter='') {
        console.log('filtro: >' + filter + '<')
    }

    function searchQuery() {
        // se a tela for pequena
        if (window.innerWidth <= 620) {
            // se já estava exibindo o input, usuario fez uma busca
            if (showSearchMobileOverlay) {
                evalQuery()
                setShowSearchMobileOverlay(false)
                setInputs(prev => { return {...prev, mobileInput: ''}})
            }
            // se não estava aparecendo, exibir o input mobile
            else {
                setShowSearchMobileOverlay(true)
            }
        }
        // se a tela for grande, ao clicar no botão já executa a busca do input
        else {
            evalQuery('filtro')
            setInputs(prev => { return {...prev, desktopInput: ''}})
        }
    }

    function onInputChange(event) {
        setInputs(prev => {
            const previous = { ...prev }
            previous[event.target.id] = event.target.value
            return previous
        })
    }

    return (
        <header className={styles.header}>
            <nav className={styles.navigationContainer}>
                <Link to="/" className={styles.navLink}>
                    <h1>
                        <span>Cine</span>
                        <span>Vortex</span>
                    </h1>
                </Link>
                <SearchContainer
                    onSearch={searchQuery}
                    inputValue={inputs.desktopInput}
                    inputChange={onInputChange}
                />
                <Link to="/favoritos" className={`${styles.navLink} ${styles.listaFavoritosContainer}` }>
          
                        <svg width="24" height="24" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M17 3c1.05 0 1.918.82 1.994 1.851L19 5v16l-7-3-7 3V5c0-1.05.82-1.918 1.851-1.994L7 3h10zm-4 4h-2v3H8v2h3v3h2v-3h3v-2h-3V7z" fill="currentColor"></path></svg>
                        <h2>Lista de favoritos</h2>
               
                </Link>
                {showSearchMobileOverlay && (
                    <div className={styles.searchMobileOverlay}>
                        <input onChange={onInputChange} value={inputs.mobileInput} id='mobileInput' type="text" placeholder='Pesquisar na CineVortex' />
                        <button onClick={searchQuery}><svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></button>
                    </div>
                )}                   
            </nav>
            
        </header>
    )
}

export default Header;