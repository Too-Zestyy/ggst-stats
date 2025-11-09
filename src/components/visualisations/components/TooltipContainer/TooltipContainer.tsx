import { ReactNode } from 'react';

import styles from './TooltipContainer.module.css';

export default (props: { children: ReactNode, isVisible: number | boolean }) => {
    return (
        <div className={styles.container} style={{ visibility: props.isVisible ? 'visible' : 'hidden' }}>
            {props.children}
        </div>
    )
}