import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import SearchContainer from '../SearchContainer';

import { filteredContent } from '../../data';

import styles from './Header.module.css'

function Header() {

    const filterItems = [
        {
            id: 1,
            title: "Tudo",
            icon: <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
        },
        {
            id: 2,
            title: "Títulos",
            icon: <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></svg>
        },
        {
            id: 3,
            title: "Séries",
            icon: <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"></path></svg>
        },
    ]

    const [currentFilter, setCurrentFilter] = useState(filterItems[0])
    const [showSearchMobileOverlay, setShowSearchMobileOverlay] = useState(false);
    const [inputs, setInputs] = useState({
        mobileInput: '',
        desktopInput: ''
    })
    
    const ref_mobileInput = useRef()

    const navigate = useNavigate()


    // Ao exibir o input de pesquisa no mobile, focar no campo
    // ref sempre vai estar definido pois o estado já indica que ele está na DOM real
    useEffect(() => {
        if (showSearchMobileOverlay)
            ref_mobileInput.current.focus()
    }, [showSearchMobileOverlay])

    // o filtro vazio indica mobile
    async function evalQuery (filter='') {
        // Usuário tentou buscar por nada
        if ((filter === '' && inputs.mobileInput.trim() === '') || (filter !== '' && inputs.desktopInput.trim() === '')) {
            console.log('pesquisou por nada')
            return
        }
   
        // pesquisa por tudo
        if (filter === '' || filter === filterItems[0].title) {
            const my_input = filter === '' ? inputs.mobileInput : inputs.desktopInput
            navigate(`/pesquisar/${my_input}`, {
                state: {
                    results: {
                        filter: filter,
                        filterTitles: filterItems.map(f => f.title),
                    }
                }
            })
        }
        

        // pesquisa no desktop com filtro diferente de 'Tudo'
        else {
            navigate(`/pesquisar/${inputs.desktopInput}`, {
                state: {
                    results: {
                        filter: filter,
                        filterTitles: filterItems.map(f => f.title),
                    }
                }
            })
        }

    }

    function searchQuery(event) {
        // o formulario permite submissão na tecla enter
        // mas queremos evitar redirecionamentos (comportamento padrão)
        event.preventDefault()

        // se a tela for pequena
        if (window.innerWidth <= 620) {
            // se já estava exibindo o input, usuario fez uma busca
            if (showSearchMobileOverlay) {
                evalQuery()
                // apenas retiro o input overlay do mobile se o usuario pesquisou alguma coisa
                if (ref_mobileInput.current.value.trim() !== '')
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
            evalQuery(currentFilter.title)
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
                    filterItems={filterItems}
                    onSearch={searchQuery}
                    inputValue={inputs.desktopInput}
                    inputChange={onInputChange}
                    filterChange={filter => setCurrentFilter(filter)}
                    currentFilter={currentFilter}
                />
                <Link to="/favoritos" className={`${styles.navLink} ${styles.listaFavoritosContainer}` }>
          
                        <svg width="24" height="24" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M17 3c1.05 0 1.918.82 1.994 1.851L19 5v16l-7-3-7 3V5c0-1.05.82-1.918 1.851-1.994L7 3h10zm-4 4h-2v3H8v2h3v3h2v-3h3v-2h-3V7z" fill="currentColor"></path></svg>
                        <h2>Lista de favoritos</h2>
               
                </Link>
                {showSearchMobileOverlay && (
                    <>
                    <form className={styles.searchMobileOverlay}>
                        <input ref={ref_mobileInput} onChange={onInputChange} value={inputs.mobileInput} id='mobileInput' type="text" placeholder='Pesquisar na CineVortex' />
                        <button type='submit' onClick={e => searchQuery(e)}>
                            <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                        </button>
                        <button type='button' onClick={() => setShowSearchMobileOverlay(false)}>
                            <svg
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                height="1.8rem"
                                width="1.8rem"
                            >
                                <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm86.63 272L320 342.63l-64-64-64 64L169.37 320l64-64-64-64L192 169.37l64 64 64-64L342.63 192l-64 64z" />
                            </svg>
                        </button>
                    </form>
                    </>
                )}                   
            </nav>
            
        </header>
    )
}

export default Header;