import styles from "./SearchContainer.module.css"
import FilterContainerOptions from "../FilterContainerOptions";
import FilterButton from "../FilterButton";

import { useEffect, useState } from "react";


function SearchContainer({ currentFilter, filterChange, filterItems, onSearch, inputValue, inputChange }) {

    const [filterButtonValue, setFilterButtonValue] = useState(filterItems[0].title)
    const [filterMenuVisible, setFilterMenuVisible] = useState(false)
    const [scaleFactor, setScaleFactor] = useState(1) // para rotacionar o ícone do botão de selecionar o filtro


    function changeFilter() {
        setFilterMenuVisible(!filterMenuVisible)
        setScaleFactor(scaleFactor => scaleFactor === 1 ? -1 : 1)
    }


    function filterOptionClicked(filterOption) {
        filterChange(filterOption)
        setFilterMenuVisible(false)
        setScaleFactor(1)
    }


    useEffect(() => {
        const newFilter = filterItems.find(item => item.id === currentFilter.id)
        setFilterButtonValue(newFilter.title)
    }, [currentFilter]) 
        
        

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
                        selected={currentFilter}
                    />
                }
            </div>
            <div className={styles.searchInputContainer}>
                <input id='desktopInput' value={inputValue} onChange={inputChange} type="text" placeholder='Pesquisar na CineVortex' />
                <button onClick={onSearch}><svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></button>
            </div>
        </div>
    )
}

export default SearchContainer;