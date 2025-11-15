import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {

    return (
        <header>
            <div className={styles.menu}>
                <ul>
                <li><a href="#">Home</a></li>
                <li>
                    <a href="#">About</a>
                    <ul>
                        <li><a href="#">Web Appaaaaaaaaa</a></li>
                        <li><a href="#">Websiteeewwwwwwwwwwwwwwww</a></li>
                        <li><a href="#">Web Appaaaaaaaaa</a></li>
                        <span className={styles.dropdownUnderline}></span>
                    </ul>
                </li>
                <li>
                    <a href="#">Services +</a>
                    <ul>
                        <li><Link to="/">Matchups</Link></li>
                        <li><Link to="/rank-distribution">Rank Distribution</Link></li>
                        <li><a href="#">Web Appaaaaaaaaa</a></li>
                        <li><a href="#">Web Appaaaaaaaaa</a></li>
                        <span className={styles.dropdownUnderline}></span>
                    </ul>
                </li>
                {/* <li><a href="#">Portfolio</a></li>
                <li><a href="#">Contact</a></li> */}
                </ul>
            </div>  
        </header>
    )

}

export default Header;