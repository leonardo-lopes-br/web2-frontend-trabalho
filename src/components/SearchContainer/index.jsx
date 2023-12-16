import styles from "./SearchContainer.module.css"
import FilterContainerOptions from "../FilterContainerOptions";
import FilterButton from "../FilterButton";

import { useEffect, useState } from "react";


function SearchContainer({ onSearch }) {

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
            title: "Episódios de séries",
            icon: <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"></path></svg>
        },
    ]

    const [filterButtonValue, setFilterButtonValue] = useState(filterItems[0].title)
    const [filterMenuVisible, setFilterMenuVisible] = useState(false)
    const [scaleFactor, setScaleFactor] = useState(1) // para rotacionar o ícone do botão de selecionar o filtro
    const [filterSelected, setFilterSelected] = useState(1)


    function changeFilter() {
        setFilterMenuVisible(!filterMenuVisible)
        setScaleFactor(scaleFactor => scaleFactor === 1 ? -1 : 1)
    }


    function filterOptionClicked(filterOptionId) {
        setFilterSelected(filterOptionId)
        setFilterMenuVisible(false)
        setScaleFactor(1)
    }


    useEffect(() => {
        const currentFilter = filterItems.find(item => item.id === filterSelected)
        setFilterButtonValue(currentFilter.title)
    }, [filterSelected]) 
        
        

    return (
        <div className={styles.searchFieldContainer}>
            <div className={styles.buttonFilterContainerOptions}>
                <FilterButton
                    value={filterButtonValue}
                    onClickFilter={changeFilter}
                    scaleFactor={scaleFactor}
                />
                {filterMenuVisible &&
                    <FilterContainerOptions
                        filterItems={filterItems}
                        filterOptionClicked={filterOptionClicked}
                        selected={filterSelected}
                    />
                }
            </div>
            <div className={styles.searchInputContainer}>
                <input type="text" placeholder='Pesquisar na CineVortex' />
                <button onClick={onSearch}><svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></button>
            </div>
        </div>
    )
}

export default SearchContainer;