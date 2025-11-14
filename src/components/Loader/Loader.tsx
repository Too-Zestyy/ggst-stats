import styles from './Loader.module.css';

const Loader = () => {

    return (
        <div className={styles.componentContainer}>

            <div className={styles.loaderContainer}>

                <div className={styles.outerCircle}></div>
                <div className={styles.midOuterCircle}></div>
                <div className={styles.midInnerCircle}></div>
                <div className={styles.innerCircle}></div>

                <div className={styles.gridLine1}></div>
                <div className={styles.gridLine2}></div>
                <div className={styles.gridLine3}></div>
                <div className={styles.gridLine4}></div>
                <div className={styles.gridLine5}></div>
                <div className={styles.gridLine6}></div>
                <div className={styles.gridLine7}></div>

                <div className={styles.loaderFace}></div>

            </div>

        </div> 
        
    )

}

export default Loader;