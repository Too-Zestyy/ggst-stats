import { ReactElement } from 'react';
import styles from './PageContainer.module.css';

const PageContainer = (props: { children: ReactElement | Array<ReactElement> }) => {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}

export default PageContainer;