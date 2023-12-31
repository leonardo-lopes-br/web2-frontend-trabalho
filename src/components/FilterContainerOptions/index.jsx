import styles from "./FilterContainerOptions.module.css"

function FilterContainerOptions({filterItems, selected, filterOptionClicked}) {

    return (
        <div className={styles.container}>
            <ul>
                {filterItems.map(
                    filterItem => <li
                                    onClick={() => filterOptionClicked(filterItem)}
                                    className={`${styles.item} ${selected.id === filterItem.id ? styles.item_selected : ""}`}
                                    key={filterItem.id}
                                   >
                                        <span>{filterItem.icon}</span>
                                        <span>{filterItem.title}</span>
                                  </li>
                )}
            </ul>
        </div>
    )
}

export default FilterContainerOptions;