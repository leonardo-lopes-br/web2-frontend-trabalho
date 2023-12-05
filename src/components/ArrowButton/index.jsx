import styles from "./ArrowButton.module.css"

function ArrowButton({ scroll, direction }) {
    return (
        <>
            <button
                onClick={scroll}
                className={
                    `${styles.contentListIconContainer}
                    ${direction.trim()[0].toUpperCase() === "L" ? styles.buttonArrowLeft : styles.buttonArrowRight}`
                }
            >
                <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
            </button>
        </>
    )
}

export default ArrowButton