import styles from './Header.module.css';


export default () => {
    return (
        <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>GGST Stats</h1>
            <nav>
                <ul>
                    <li>Overview</li>
                    <ul>
                        <li>Drop 1</li>
                        <li>Drop 2</li>
                        <li>Drop 2</li>
                    </ul>
                    <li>Matchups</li>
                    <li>About</li>
                </ul>
            </nav>
        </header>
    )
}