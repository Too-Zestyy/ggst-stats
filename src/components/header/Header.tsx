import styles from './Header.module.css';


export default () => {
    return (
        <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>GGST Stats</h1>
            <nav>
                <ul>
                    <li>Overview</li>
                    <li>Matchups</li>
                    <ul className={styles.dropdownMenu}>
                        <li>Drop 1</li>
                        <li>Drop 2</li>
                        <li>Drop 2</li>
                    </ul>
                    <li>About</li>
                </ul>
            </nav>
        </header>
    )
}