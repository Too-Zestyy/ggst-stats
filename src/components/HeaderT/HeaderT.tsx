import styles from './HeaderT.module.css';

const Header = () => {

    return (
        <header>
            <div className={styles.menu}>
                <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li>
                    <a href="#">Services +</a>
                    <ul>
                        <li><a href="#">Website</a></li>
                        <li><a href="#">Web App</a></li>
                        <span className={styles.dropdownUnderline}></span>
                    </ul>
                </li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Contact</a></li>
                </ul>
            </div>  
        </header>
    )

}

export default Header;