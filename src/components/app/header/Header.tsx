import { useEffect, useState } from 'react';
import styles from './Header.module.css';


export default () => {
    return (
        <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>GGST Stats</h1>
            <nav>
                <ul>
                    <li>Overview</li>
                    <li>Matchups</li>
                    <li>About</li>
                </ul>
            </nav>
        </header>
    )
}